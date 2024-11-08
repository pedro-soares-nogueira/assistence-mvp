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
    <div>
      {previousAvatar && (
        <>
          {image && (
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={250}
              height={250}
              border={20}
              color={[255, 255, 255, 0.6]} // Cor do fundo, se necessário
              scale={1.2} // Escala da imagem dentro do editor, opcional
              rotate={0} // Rotação inicial, opcional
              borderRadius={99999}
            />
          )}
          {image && (
            <button
              onClick={handleSave}
              className="mt-2 py-1 px-2 text-sm text-gray-800 border border-gray-500 hover:bg-gray-200 transition-all rounded-md"
            >
              Confirmar
            </button>
          )}

          {!image && selectedFile ? (
            <>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Imagem Selecionada"
                className="w-[12rem] h-[12rem] rounded-full object-cover"
              />
            </>
          ) : (
            <>
              <img
                src={previousAvatarUrl}
                alt=""
                className="w-[12rem] h-[12rem] rounded-full object-cover"
              />
            </>
          )}

          <label
            htmlFor="dropzone-file-update"
            className="mt-4 max-w-40 w-full py-2 ml-4 text-center font-light text-sm flex flex-col items-center justify-center border border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50"
          >
            Editar imagem
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
                  className="w-[12rem] h-[12rem] rounded-full object-cover"
                />
                <label
                  htmlFor="dropzone-file-update"
                  className="mt-4 max-w-40 w-full py-2 ml-4 text-center font-light text-sm flex flex-col items-center justify-center border border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50"
                >
                  Editar imagem
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
                    className="flex flex-col items-center justify-center w-[12rem] h-[12rem] border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                      <svg
                        className="w-6 h-6 mb-4 text-gray-500"
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
                      <p className="mb-2 text-sm text-gray-500 text-center">
                        Escolha uma imagem
                      </p>
                      <p className="text-xs text-gray-500 text-center">
                        SVG, PNG ou JPG (MAX. 200x200px)
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
              width={250}
              height={250}
              border={20}
              color={[255, 255, 255, 0.6]} // Cor do fundo, se necessário
              scale={1.2} // Escala da imagem dentro do editor, opcional
              rotate={0} // Rotação inicial, opcional
              borderRadius={99999}
            />
          )}
          {image && (
            <button
              onClick={handleSave}
              className="mt-2 py-1 px-2 text-sm text-gray-800 border border-gray-500 hover:bg-gray-200 transition-all rounded-md"
            >
              Confirmar
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AvatarUploader;
