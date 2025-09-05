import functions_framework
from google.cloud import storage, pubsub_v1
from google.cloud import aiplatform

# Initialize Google Cloud clients
storage_client = storage.Client()
publisher = pubsub_v1.PublisherClient()
aiplatform.init(project='YOUR_PROJECT_ID', location='YOUR_GCP_REGION')

# Replace with your actual bucket and topic names
processed_bucket_name = 'your-startup-docs-processed'
analysis_topic_name = 'projects/YOUR_PROJECT_ID/topics/document-analysis-topic'

@functions_framework.cloud_event
def ocr_document(cloud_event):
    """
    Cloud Function that triggers when a new file is uploaded to the raw bucket.
    It performs OCR using Gemini 2.5 Pro and saves the output as a JSON file.
    """
    data = cloud_event.data
    bucket_name = data["bucket"]
    file_name = data["name"]

    print(f"Processing file: {file_name} from bucket: {bucket_name}")

    # Check if the file is a PDF
    if not file_name.lower().endswith('.pdf'):
        print(f"Skipping non-PDF file: {file_name}")
        return

    # Download the file from the raw bucket
    source_bucket = storage_client.bucket(bucket_name)
    source_blob = source_bucket.blob(file_name)

    # We need a temporary location to store the file
    temp_file_path = f"/tmp/{file_name}"
    source_blob.download_to_filename(temp_file_path)
    print(f"File downloaded to {temp_file_path}")

    try:
        # Use Gemini to perform detailed OCR analysis
        model = aiplatform.GenerativeModel(model_name="gemini-1.5-pro-preview-0514")

        # This is your prompt engineering for detailed OCR
        prompt_content = f"""
        Perform a detailed OCR on the following title deed document. 
        Extract all text content from each page and provide it in a structured JSON format. 
        For each page, create an object with the key "page_number" and "text_content". 
        Do not provide any analysis yet, just a raw, page-by-page text dump.
        """

        # Load the PDF file for Gemini
        pdf_file = aiplatform.Part.from_data(data=open(temp_file_path, "rb").read(), mime_type="application/pdf")

        response = model.generate_content([pdf_file, prompt_content])

        # Save the Gemini response to the processed bucket as a JSON file
        processed_bucket = storage_client.bucket(processed_bucket_name)
        output_file_name = f"{file_name.replace('.pdf', '')}_raw_ocr.json"
        processed_blob = processed_bucket.blob(output_file_name)

        processed_blob.upload_from_string(
            data=response.text,
            content_type='application/json'
        )
        print(f"OCR output saved to {processed_bucket_name}/{output_file_name}")

        # Publish a message to the Pub/Sub topic to trigger the next step
        # This is crucial for decoupling your workflow
        message_payload = {
            "bucket": processed_bucket_name,
            "file_name": output_file_name
        }
        future = publisher.publish(analysis_topic_name, str(message_payload).encode('utf-8'))
        print(f"Published message to Pub/Sub topic. Message ID: {future.result()}")

    except Exception as e:
        print(f"An error occurred: {e}")

    # Clean up the temporary file
    os.remove(temp_file_path)