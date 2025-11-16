'use client';

import React, { useState, useRef, useCallback } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
}

export const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions | null>(null);
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    quality: 0.9
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Supported file types
  const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB limit for free users

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!supportedTypes.includes(file.type)) {
      return 'Unsupported file type. Please use JPG, PNG, WebP, or GIF.';
    }
    if (file.size > maxFileSize) {
      return 'File size exceeds 10MB limit. Please upgrade for larger files.';
    }
    return null;
  };

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);
    setProcessedImageUrl(null);

    // Load image to get original dimensions
    const img = new Image();
    img.onload = () => {
      const dimensions = { width: img.width, height: img.height };
      setOriginalDimensions(dimensions);
      
      // Set default resize options based on original dimensions
      setResizeOptions(prev => ({
        ...prev,
        width: Math.min(img.width, 800), // Default to 800px max width
        height: prev.maintainAspectRatio 
          ? Math.round((Math.min(img.width, 800) * img.height) / img.width)
          : Math.min(img.height, 600)
      }));
    };
    img.src = URL.createObjectURL(file);
  }, []);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Update dimensions with aspect ratio
  const updateDimensions = (field: 'width' | 'height', value: number) => {
    if (!originalDimensions) return;

    const newOptions = { ...resizeOptions };
    
    if (field === 'width') {
      newOptions.width = value;
      if (newOptions.maintainAspectRatio) {
        newOptions.height = Math.round((value * originalDimensions.height) / originalDimensions.width);
      }
    } else {
      newOptions.height = value;
      if (newOptions.maintainAspectRatio) {
        newOptions.width = Math.round((value * originalDimensions.width) / originalDimensions.height);
      }
    }
    
    setResizeOptions(newOptions);
  };

  // Resize image using canvas
  const resizeImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!selectedFile || !canvasRef.current) {
        reject(new Error('No file selected or canvas not available'));
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = resizeOptions.width;
        canvas.height = resizeOptions.height;

        // Clear canvas and draw resized image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, resizeOptions.width, resizeOptions.height);

        // Convert to blob and create download URL
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          selectedFile.type,
          resizeOptions.quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(selectedFile);
    });
  };

  // Handle resize button click
  const handleResize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const resizedImageUrl = await resizeImage();
      setProcessedImageUrl(resizedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resize image');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download processed image
  const handleDownload = () => {
    if (!processedImageUrl || !selectedFile) return;

    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `resized_${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to upload new image
  const handleReset = () => {
    setSelectedFile(null);
    setOriginalDimensions(null);
    setProcessedImageUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Upload Area */}
      {!selectedFile && (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="mb-4">
            <svg className="w-12 h-12 text-blue-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Drop your image here or <span className="text-blue-500 underline">browse</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Supports JPG, PNG, WebP, GIF (max 10MB)
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Select Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Image Processing Interface */}
      {selectedFile && originalDimensions && (
        <div className="space-y-6">
          {/* Image Preview and Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Selected Image</h3>
              <button
                onClick={handleReset}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Original"
                  className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700 rounded"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Original: {originalDimensions.width} × {originalDimensions.height}px
                </p>
              </div>
              
              {processedImageUrl && (
                <div>
                  <img
                    src={processedImageUrl}
                    alt="Resized"
                    className="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700 rounded"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Resized: {resizeOptions.width} × {resizeOptions.height}px
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resize Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Resize Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={resizeOptions.width}
                  onChange={(e) => updateDimensions('width', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  min="1"
                  max="5000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={resizeOptions.height}
                  onChange={(e) => updateDimensions('height', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  min="1"
                  max="5000"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={resizeOptions.maintainAspectRatio}
                  onChange={(e) => setResizeOptions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Maintain aspect ratio</span>
              </label>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Quality:</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={resizeOptions.quality}
                  onChange={(e) => setResizeOptions(prev => ({ ...prev, quality: parseFloat(e.target.value) }))}
                  className="w-20"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(resizeOptions.quality * 100)}%
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleResize}
                disabled={isProcessing}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Resize Image'}
              </button>
              
              {processedImageUrl && (
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Download Resized Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
