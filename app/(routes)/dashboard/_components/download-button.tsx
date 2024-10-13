import { Button } from "@/app/components/ui/button";
import { ImageDownIcon } from "lucide-react";
import React from "react";

type DownloadButtonProps = {
  imageUrl: string;
  fileName: string;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ imageUrl, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleDownload}>
      <ImageDownIcon className="h-4 w-4" />
    </Button>
  );
};

export default DownloadButton;
