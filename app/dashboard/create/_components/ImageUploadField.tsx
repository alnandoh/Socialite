import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadFieldProps {
  control: any;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ control }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files?.[0];
      setImage(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  return (
    <FormField
      control={control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Upload your image</FormLabel>
          <FormControl>
            <div className="flex flex-col">
              <div className="w-full aspect-[2/1] mb-2 relative border-dashed border rounded-md overflow-hidden">
                <input
                  type="file"
                  {...field}
                  accept=".jpg, .jpeg, .png, .webp"
                  onChange={handleImageUpload}
                  className="cursor-pointer inset-0 absolute opacity-0"
                />
                {image ? (
                  <Image
                    src={image}
                    alt="preview"
                    width={600}
                    height={300}
                    className="object-cover aspect-[2/1] object-center"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-slate-300 gap-2 pt-8">
                    <UploadCloud size={72} />
                    <div className="flex flex-col text-stone-800 text-sm text-center mt-2">
                      <p>Supported file format:</p>
                      <p>JPG, JPEG, PNG, SVG</p>
                      <p>Max file size: 2MB</p>
                    </div>
                  </div>
                )}
              </div>
              {fileName ? (
                <p className="text-sm text-center mt-2.5">{fileName}</p>
              ) : (
                <p className="text-sm text-center mt-2.5">No files selected</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploadField;
