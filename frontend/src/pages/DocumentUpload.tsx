import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Scale, CheckCircle2, X } from "lucide-react";

const DocumentUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [justUploaded, setJustUploaded] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type.startsWith('image/') ||
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were rejected",
        description: "Only PDF, Word, and image files are supported",
        variant: "destructive",
      });
    }

    const startIndex = uploadedFiles.length;
    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Mark new files as just uploaded for animation
    const newFileIndices = validFiles.map((_, i) => startIndex + i);
    setJustUploaded(newFileIndices);
    
    // Remove animation after 2 seconds
    setTimeout(() => {
      setJustUploaded([]);
    }, 2000);
    
    if (validFiles.length > 0) {
      toast({
        title: "Documents uploaded!",
        description: `${validFiles.length} file(s) ready for analysis`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setJustUploaded(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i));
  };

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

        {uploadedFiles.length > 0 && (
          <Card className="mb-8 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Uploaded Documents
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500 ${
                      justUploaded.includes(index) 
                        ? 'bg-primary/5 border-primary/30 animate-pulse' 
                        : 'bg-muted/50 border-border hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <FileText className="h-5 w-5 text-primary" />
                        {justUploaded.includes(index) && (
                          <CheckCircle2 className="h-3 w-3 text-primary absolute -top-1 -right-1 animate-bounce" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{file.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                          {justUploaded.includes(index) && (
                            <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                              Just uploaded
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
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

export default DocumentUpload;