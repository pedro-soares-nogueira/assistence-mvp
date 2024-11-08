import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

interface AvatarUploaderProps {
  onUpload: (file: File) => void;
  previousAvatarUrl: string;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  onUpload,
  previousAvatarUrl,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const previousAvatar = previousAvatarUrl !== "";

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          onUpload(new File([blob], "avatar.png", { type: "image/png" }));
          setSelectedFile(
            new File([blob], "avatar.png", { type: "image/png" })
          );
        }
      });
      setImage(null);
    }
  };

  // https://res.cloudinary.com/drd7zf40n/image/upload/v1720474911/o6cahb6kvphd3vdcr9gf.png
  return (
    <div className="relative">
      {previousAvatar && (
        <>
          {image && (
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={120}
              height={120}
              border={0}
              color={[255, 255, 255, 0.6]} // Cor do fundo, se necessário
              scale={1.2} // Escala da imagem dentro do editor, opcional
              rotate={0} // Rotação inicial, opcional
              borderRadius={99999}
            />
          )}
          {image && (
            <button
              onClick={handleSave}
              className="mt-2 p-2 text-sm text-gray-800 hover:bg-gray-200 bg-gray-100 transition-all rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
          )}

          {!image && selectedFile ? (
            <>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Imagem Selecionada"
                className="w-[8rem] h-[8rem] rounded-full object-cover"
              />
            </>
          ) : (
            <>
              <img
                src={previousAvatarUrl}
                alt=""
                className="w-[8rem] h-[8rem] rounded-full object-cover"
              />
            </>
          )}

          <label
            htmlFor="dropzone-file-update"
            className="absolute top-0 left-24 w-[30px] py-[7px] text-center font-light text-[11px] flex flex-col items-center justify-center rounded-md cursor-pointer bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>

            <input
              id="dropzone-file-update"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </>
      )}
      {!previousAvatar && (
        <>
          {!image &&
            (selectedFile ? (
              <>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Imagem Selecionada"
                  className="w-[8rem] h-[8rem] rounded-full object-cover"
                />
                <label
                  htmlFor="dropzone-file-update"
                  className="absolute top-0 left-24 w-[30px] py-[7px] text-center font-light text-[11px] flex flex-col items-center justify-center rounded-md cursor-pointer bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                  <input
                    id="dropzone-file-update"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </>
            ) : (
              <>
                <div className="flex items-center justify-start w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-[8rem] h-[8rem] border border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                      <svg
                        className="w-5 h-5 mb-1 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-1 text-[12px] font-light text-gray-500 text-center">
                        Seu avatar
                      </p>
                      <p className="text-[9px] leading-3 text-gray-500 text-center">
                        PNG ou JPG (max. 200x200px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </>
            ))}
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          {image && (
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={120}
              height={120}
              border={0}
              color={[255, 255, 255, 0.6]} // Cor do fundo, se necessário
              scale={1.2} // Escala da imagem dentro do editor, opcional
              rotate={0} // Rotação inicial, opcional
              borderRadius={99999}
            />
          )}
          {image && (
            <button
              onClick={handleSave}
              className="mt-2 p-2 text-sm text-gray-800 hover:bg-gray-200 bg-gray-100 transition-all rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AvatarUploader;
