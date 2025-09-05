// Import necessary components and libraries.
import { useState, useRef } from "react"; // Hooks for managing state and refs.
import { Button } from "@/components/ui/button"; // Button component.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card components.
import { useToast } from "@/hooks/use-toast"; // Hook for displaying toasts.
import { Upload, FileText, Scale } from "lucide-react"; // Icons.

// The DocumentUpload component handles the file upload functionality.
const DocumentUpload = () => {
  // State to track if a file is being dragged over the drop zone.
  const [isDragging, setIsDragging] = useState(false);
  // State to store the list of uploaded files.
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  // Ref for the file input element.
  const fileInputRef = useRef<HTMLInputElement>(null);
  // useToast hook for displaying notifications.
  const { toast } = useToast();

  // Handles the drag enter event.
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handles the drag leave event.
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handles the drag over event.
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handles the drop event.
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handles the file selection from the file input.
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  // Processes the selected or dropped files.
  const handleFiles = (files: File[]) => {
    // Filter for valid file types.
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/') ||
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    // Show a toast if any files were rejected.
    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were rejected",
        description: "Only PDF, Word, and image files are supported",
        variant: "destructive",
      });
    }

    // Add the valid files to the state.
    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Show a success toast if any files were uploaded.
    if (validFiles.length > 0) {
      toast({
        title: "Documents uploaded!",
        description: `${validFiles.length} file(s) ready for analysis`,
      });
    }
  };

  // Removes a file from the uploaded files list.
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Simulates the document analysis process.
  const analyzeDocuments = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No documents to analyze",
        description: "Please upload at least one document first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Analysis started",
      description: "Your legal documents are being processed...",
    });
  };

  return (
    // Main container for the document upload page.
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Scale className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Legal Document Analysis</h1>
          <p className="text-muted-foreground">Upload your property documents for AI-powered review</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Drag and drop your legal documents or click to browse. Supports PDF, Word, and image files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Drop zone for file uploads. */}
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your documents here</h3>
              <p className="text-muted-foreground mb-4">
                or click to browse your files
              </p>
              <Button
                variant="hero"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Display the list of uploaded files. */}
        {uploadedFiles.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Uploaded Documents ({uploadedFiles.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="font-medium">{file.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={analyzeDocuments}
                  className="px-8"
                >
                  <Scale className="h-4 w-4 mr-2" />
                  Analyze Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Export the DocumentUpload component.
export default DocumentUpload;
