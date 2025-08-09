import React, { useCallback, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  accept = "image/*",
  className
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  if (selectedFile) {
    return (
      <div className={cn(
        "relative rounded-xl border-2 border-dashed border-primary/20 bg-gradient-card p-6",
        "flex items-center justify-between",
        className
      )}>
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <p className="font-medium text-card-foreground">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          onClick={onFileRemove}
          className="rounded-full p-2 hover:bg-destructive/10 transition-colors"
        >
          <X className="h-5 w-5 text-destructive" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-all duration-300",
        dragActive 
          ? "border-primary bg-primary/5 shadow-glow" 
          : "border-border hover:border-primary/50",
        "bg-gradient-card p-8 text-center cursor-pointer",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className={cn(
            "h-8 w-8 transition-colors",
            dragActive ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-card-foreground">
            Carica il Grafico di Trading
          </h3>
          <p className="text-sm text-muted-foreground">
            Trascina qui il tuo screenshot o{" "}
            <span className="text-primary font-medium">clicca per selezionare</span>
          </p>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Supporta: PNG, JPG, JPEG (max 10MB)
        </div>
      </div>
    </div>
  );
};