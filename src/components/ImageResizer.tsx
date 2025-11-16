'use client';

import React, { useState, useRef, useCallback } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

type ResizeMode = 'bySize' | 'asPercentage' | 'socialMedia';

interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  quality: number;
  mode: ResizeMode;
  percentage: number;
  socialPlatform: string;
  presetType: string;
  targetFileSize: number;
  targetFileSizeUnit: 'KB' | 'MB';
  exportFormat: string;
  backgroundFill: boolean;
}

interface SocialMediaPreset {
  platform: string;
  presets: {
    name: string;
    width: number;
    height: number;
    description: string;
  }[];
}

const socialMediaPresets: SocialMediaPreset[] = [
  {
    platform: 'Instagram',
    presets: [
      { name: 'Story (1080 X 1920)', width: 1080, height: 1920, description: 'Instagram Story' },
      { name: 'Post Square (1080 X 1080)', width: 1080, height: 1080, description: 'Instagram Square Post' },
      { name: 'Post Portrait (1080 X 1350)', width: 1080, height: 1350, description: 'Instagram Portrait Post' },
      { name: 'Post Landscape (1080 X 566)', width: 1080, height: 566, description: 'Instagram Landscape Post' },
      { name: 'Reel (1080 X 1920)', width: 1080, height: 1920, description: 'Instagram Reel' }
    ]
  },
  {
    platform: 'Facebook',
    presets: [
      { name: 'Cover Photo (820 X 312)', width: 820, height: 312, description: 'Facebook Cover' },
      { name: 'Post (1200 X 630)', width: 1200, height: 630, description: 'Facebook Post' },
      { name: 'Story (1080 X 1920)', width: 1080, height: 1920, description: 'Facebook Story' }
    ]
  },
  {
    platform: 'Twitter',
    presets: [
      { name: 'Header (1500 X 500)', width: 1500, height: 500, description: 'Twitter Header' },
      { name: 'Post (1200 X 675)', width: 1200, height: 675, description: 'Twitter Post' }
    ]
  },
  {
    platform: 'LinkedIn',
    presets: [
      { name: 'Cover (1584 X 396)', width: 1584, height: 396, description: 'LinkedIn Cover' },
      { name: 'Post (1200 X 627)', width: 1200, height: 627, description: 'LinkedIn Post' }
    ]
  },
  {
    platform: 'YouTube',
    presets: [
      { name: 'Thumbnail (1280 X 720)', width: 1280, height: 720, description: 'YouTube Thumbnail' },
      { name: 'Channel Art (2560 X 1440)', width: 2560, height: 1440, description: 'YouTube Channel Art' }
    ]
  }
];

export const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions | null>(null);
  const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
    quality: 0.9,
    mode: 'bySize',
    percentage: 100,
    socialPlatform: 'Instagram',
    presetType: 'Story (1080 X 1920)',
    targetFileSize: 0,
    targetFileSizeUnit: 'KB',
    exportFormat: 'Original',
    backgroundFill: false
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

  // Update dimensions based on percentage
  const updatePercentage = (percentage: number) => {
    if (!originalDimensions) return;

    const newOptions = { ...resizeOptions };
    newOptions.percentage = percentage;
    newOptions.width = Math.round((originalDimensions.width * percentage) / 100);
    newOptions.height = Math.round((originalDimensions.height * percentage) / 100);
    
    setResizeOptions(newOptions);
  };

  // Update dimensions based on social media preset
  const updateSocialMediaPreset = (platform: string, presetName: string) => {
    const platformData = socialMediaPresets.find(p => p.platform === platform);
    if (!platformData) return;

    const preset = platformData.presets.find(p => p.name === presetName);
    if (!preset) return;

    const newOptions = { ...resizeOptions };
    newOptions.socialPlatform = platform;
    newOptions.presetType = presetName;
    newOptions.width = preset.width;
    newOptions.height = preset.height;
    newOptions.maintainAspectRatio = false; // Social media presets have fixed dimensions
    
    setResizeOptions(newOptions);
  };

  // Get current preset options for selected platform
  const getCurrentPresets = () => {
    const platformData = socialMediaPresets.find(p => p.platform === resizeOptions.socialPlatform);
    return platformData?.presets || [];
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
            <h3 className="text-lg font-semibold mb-4">Resize Settings</h3>
            
            {/* Mode Selection Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
              <button
                onClick={() => setResizeOptions(prev => ({ ...prev, mode: 'bySize' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  resizeOptions.mode === 'bySize'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                By Size
              </button>
              <button
                onClick={() => setResizeOptions(prev => ({ ...prev, mode: 'asPercentage' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  resizeOptions.mode === 'asPercentage'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                As Percentage
              </button>
              <button
                onClick={() => setResizeOptions(prev => ({ ...prev, mode: 'socialMedia' }))}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  resizeOptions.mode === 'socialMedia'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Social Media
              </button>
            </div>

            {/* By Size Mode */}
            {resizeOptions.mode === 'bySize' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Width
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        placeholder="Enter Width"
                        value={resizeOptions.width}
                        onChange={(e) => updateDimensions('width', parseInt(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        min="1"
                        max="5000"
                      />
                      <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-sm text-gray-600 dark:text-gray-300">
                        px
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        value={resizeOptions.height}
                        onChange={(e) => updateDimensions('height', parseInt(e.target.value) || 0)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        min="1"
                        max="5000"
                      />
                      <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-sm text-gray-600 dark:text-gray-300">
                        px
                      </span>
                    </div>
                  </div>
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resizeOptions.maintainAspectRatio}
                    onChange={(e) => setResizeOptions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                    className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Lock Aspect Ratio</span>
                </label>
              </div>
            )}

            {/* As Percentage Mode */}
            {resizeOptions.mode === 'asPercentage' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={resizeOptions.percentage}
                      onChange={(e) => updatePercentage(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white mr-1">
                        {resizeOptions.percentage}%
                      </span>
                      <select
                        defaultValue="px"
                        className="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm dark:bg-gray-700 dark:text-white"
                        disabled
                      >
                        <option value="px">px</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Make my image {resizeOptions.percentage}% of original size
                  </p>
                </div>
              </div>
            )}

            {/* Social Media Mode */}
            {resizeOptions.mode === 'socialMedia' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Choose the Social Media Platform
                  </label>
                  <select
                    value={resizeOptions.socialPlatform}
                    onChange={(e) => {
                      const newPlatform = e.target.value;
                      const firstPreset = socialMediaPresets.find(p => p.platform === newPlatform)?.presets[0];
                      if (firstPreset) {
                        updateSocialMediaPreset(newPlatform, firstPreset.name);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {socialMediaPresets.map(platform => (
                      <option key={platform.platform} value={platform.platform}>
                        {platform.platform}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preset Type
                  </label>
                  <select
                    value={resizeOptions.presetType}
                    onChange={(e) => updateSocialMediaPreset(resizeOptions.socialPlatform, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {getCurrentPresets().map(preset => (
                      <option key={preset.name} value={preset.name}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Width
                    </label>
                    <input
                      type="number"
                      value={resizeOptions.width}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Height
                    </label>
                    <input
                      type="number"
                      value={resizeOptions.height}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    />
                  </div>
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resizeOptions.maintainAspectRatio}
                    onChange={(e) => setResizeOptions(prev => ({ ...prev, maintainAspectRatio: e.target.checked }))}
                    className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Lock Aspect Ratio</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resizeOptions.backgroundFill}
                    onChange={(e) => setResizeOptions(prev => ({ ...prev, backgroundFill: e.target.checked }))}
                    className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Background Fill</span>
                  <svg className="w-4 h-4 ml-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Unit
                  </label>
                  <select
                    defaultValue="Pixels"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    disabled
                  >
                    <option value="Pixels">Pixels</option>
                  </select>
                </div>
              </div>
            )}

            {/* Export Settings */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Export Settings</h4>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target File Size <span className="text-gray-500">(optional)</span>
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={resizeOptions.targetFileSize}
                      onChange={(e) => setResizeOptions(prev => ({ ...prev, targetFileSize: parseInt(e.target.value) || 0 }))}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter target size"
                    />
                    <select
                      value={resizeOptions.targetFileSizeUnit}
                      onChange={(e) => setResizeOptions(prev => ({ ...prev, targetFileSizeUnit: e.target.value as 'KB' | 'MB' }))}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md text-sm text-gray-600 dark:text-gray-300"
                    >
                      <option value="KB">KB</option>
                      <option value="MB">MB</option>
                    </select>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Set a max output file size. Only works for JPG files
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Save Image As
                  </label>
                  <select
                    value={resizeOptions.exportFormat}
                    onChange={(e) => setResizeOptions(prev => ({ ...prev, exportFormat: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Original">Original</option>
                    <option value="JPG">JPG</option>
                    <option value="PNG">PNG</option>
                    <option value="WebP">WebP</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
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
