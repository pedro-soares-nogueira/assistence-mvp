"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PartnerProfile } from "@/interfaces";
import CitySelector from "./partner-profile/CitySelector";
import SelectSpecialyties from "./partner-profile/SelectSpecialyties";
import CreatableSelectTags from "./partner-profile/CreatableSelectTags";
import PartnerDetails from "./partner-profile/PartnerDetails";
import AvatarUploader from "./design-components/AvatarUploder";
import ToggleSwitch from "./design-components/ToggleSwitch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PartnerProfileProps {
  details: {
    // id: string;
    user_id: string;
    fantasy_name: string | null;
    prof_email: string | null;
    bio: string | null;
    avatar_url: string | null;
    city_ibge_id: string | null;
    tags: string[];
    specialty_id: string | null;
    whatsapp: string | null;
    instagram: string | null;
    facebook: string | null;
    has_social_value: boolean;
    has_duty_free: boolean;
    duty_free_count: string | null | undefined;
    online: boolean;
    in_person: boolean;
    address: string | null;
    professional_registration: string | null;
  };
}

const PartnerSchema = (hasDutyFree: boolean, inPerson: boolean) =>
  z.object({
    fantasy_name: z.string().min(3).nullable(),
    prof_email: z.string().min(3).nullable(),
    whatsapp: z.string(),
    instagram: z.string().nullable(),
    facebook: z.string().nullable(),
    registration: z.string().min(4).nullable(),
    dutyFreeCount: hasDutyFree
      ? z.string().min(1)
      : z.string().nullable().optional(),
    address: inPerson ? z.string().min(1) : z.string().nullable().optional(),
    specialtyValidation: z.string(),
  });

type PartnerType = z.infer<ReturnType<typeof PartnerSchema>>;

const PartnerProfileForm = ({ details }: PartnerProfileProps) => {
  const [selectedSpecialtyValue, setSelectedSpecialtyValue] = useState<
    string | null | undefined
  >();
  const [selectedTags, setSelectedTags] = useState<string[]>(details.tags);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [detailsContent, setDetailsContent] = useState(details.bio);

  const [hasSocialValue, setHasSocialValue] = useState<boolean>(
    details.has_social_value
  );
  const [hasDutyFree, setHasDutyFree] = useState<boolean>(
    details.has_duty_free
  );

  const [online, setOnline] = useState<boolean>(details.online);
  const [inPerson, setInPerson] = useState<boolean>(details.in_person);

  const previousAvatarUrl = details.avatar_url ?? "";
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileFormData = new FormData();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<PartnerType>({
    defaultValues: {
      fantasy_name: details.fantasy_name,
      prof_email: details.prof_email,
      registration: details.professional_registration,
      whatsapp: details.whatsapp ?? "",
      instagram: details.instagram,
      facebook: details.facebook,
      dutyFreeCount: details.duty_free_count,
      address: details.address,
    },
    resolver: zodResolver(PartnerSchema(hasDutyFree, inPerson)),
  });

  useEffect(() => {
    reset({ dutyFreeCount: hasDutyFree ? undefined : null });
    reset({ address: inPerson ? undefined : null });
  }, [hasDutyFree, inPerson, reset]);

  useEffect(() => {
    if (details.whatsapp) {
      handlePhoneChange({
        target: { value: details.whatsapp },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [details.whatsapp]);

  const onSubmit = async (data: PartnerType) => {
    // Verifica o formato do telefone
    const phoneRegex = /^\+55\(\d{2}\)\d{5}-\d{4}$/;

    if (!phoneRegex.test(data.whatsapp!)) {
      setError("whatsapp", {
        message:
          "Telefone é obrigatório e deve estar no formato +55(xx)xxxxx-xxxx",
      });
      return;
    }

    if (avatarFile === null) {
      toast.error("O avatar também é obrigatório!", {
        position: "top-right",
      });
      return;
    }

    console.log(selectedSpecialtyValue === "");
    /*  if (selectedSpecialtyValue === "") {
      setError("specialtyValidation", {
        message: "Selecione uma especialidade",
      });
      console.log(errors);
      return;
    } */

    let avatarUrl = "";

    // console.log(avatarFile);

    if (avatarFile != null) {
      fileFormData.append("file", avatarFile as Blob);
      fileFormData.append("upload_preset", "pridecare");

      const imageUpload = await fetch(
        "https://api.cloudinary.com/v1_1/drd7zf40n/image/upload",
        { method: "POST", body: fileFormData }
      );

      const responseData = await imageUpload.json();
      avatarUrl = responseData.secure_url;
    } else {
      avatarUrl = previousAvatarUrl ?? "";
    }

    const dataToCreate = {
      user_id: details.user_id,
      specialty: selectedSpecialtyValue,
      tags: selectedTags,
      ibge_city_id: selectedCity?.toString(),
      bio: detailsContent,
      hasSocialValue,
      hasDutyFree,
      online,
      inPerson,
      avatarUrl,
      ...data,
    };

    try {
      const response = await fetch(
        "https://api-pridecare.com/api/create_partner_profile.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToCreate),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      toast.success(responseData.message, {
        position: "top-right",
      });
    } catch (error) {
      console.error("Erro ao registrar parceiro:", error);
    }
  };

  const handleUpload = (file: File) => {
    if (!file) alert("Sem file");
    setAvatarFile(file);
  };

  const [formattedPhone, setFormattedPhone] = useState<string>(
    () => details.whatsapp ?? ""
  );

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let phone = event.target.value.replace(/\D/g, "");

    if (phone.startsWith("55")) {
      phone = phone.slice(2);
    }

    let formatted = "+55";

    if (phone.length > 2) {
      formatted += `(${phone.substr(0, 2)})`;

      if (phone.length > 7) {
        formatted += `${phone.substr(2, 5)}-${phone.substr(7, 4)}`;
      } else {
        formatted += `${phone.substr(2)}`;
      }
    } else {
      formatted += `(${phone}`;
    }

    setFormattedPhone(formatted);
    setValue("whatsapp", formatted);
  };

  return (
    <div className="">
      <ToastContainer />
      <h2 className="text-xl font-semibold">
        Atualize seu cadastro de parceiro
      </h2>

      <form className="mt-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <AvatarUploader
                onUpload={handleUpload}
                previousAvatarUrl={previousAvatarUrl}
              />
            </div>
            <div className="">
              <label htmlFor="fantasy_name">Qual seu nome fantasia?</label>
              <input
                type="text"
                id="fantasy_name"
                {...register("fantasy_name")}
                placeholder="Digite seu nome fantasia"
              />
              {errors.fantasy_name && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
              <small className="text-xs text-gray-800">
                Aparecerá para seus pacientes
              </small>
            </div>

            <div className="">
              <label htmlFor="prof_email">Qual seu email institucional?</label>
              <input
                type="text"
                id="prof_email"
                {...register("prof_email")}
                placeholder="Digite seu nome fantasia"
              />
              {errors.prof_email && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
              <small className="text-xs text-gray-800">
                Aparecerá para seus pacientes
              </small>
            </div>

            <CitySelector
              setSelectedCity={setSelectedCity}
              inicialValue={details.city_ibge_id}
              selectedCity={selectedCity}
            />

            <SelectSpecialyties
              setSelectedSpecialtyValue={setSelectedSpecialtyValue}
              previousSpecialty={details.specialty_id ?? ""}
              selectedSpecialtyValue={selectedSpecialtyValue}
            />

            <CreatableSelectTags
              setSelectedTags={setSelectedTags}
              content={selectedTags}
            />

            <PartnerDetails
              content={detailsContent}
              onChange={(newContent: string) => setDetailsContent(newContent)}
            />
          </div>

          <div className="space-y-6">
            <div className="">
              <label htmlFor="whatsapp">Numero de whatsapp</label>
              <input
                type="text"
                id="whatsapp"
                value={formattedPhone}
                onChange={handlePhoneChange}
                // {...register("whatsapp")}
                // placeholder="Seu melhor telefone"
                placeholder="Digite seu whatsapp"
              />
              {errors.whatsapp && (
                <span className="text-red-500 text-sm font-light">
                  {errors.whatsapp.message}
                </span>
              )}
            </div>

            <div className="">
              <label htmlFor="instagram">Qual LINK do seu instagram?</label>
              <input
                type="text"
                id="instagram"
                {...register("instagram")}
                placeholder="Qual seu instagram"
              />
              {errors.instagram && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
              <small className="text-xs text-gray-800">
                Informe o link de acesso
              </small>
            </div>

            <div className="">
              <label htmlFor="facebook">Qual LINK do seu facebook?</label>
              <input
                type="text"
                id="facebook"
                {...register("facebook")}
                placeholder="Qual seu facebook"
              />
              {errors.facebook && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
              <small className="text-xs text-gray-800">
                Informe o link de acesso
              </small>
            </div>

            <div className="">
              <label htmlFor="registration">Qual seu numero de registro?</label>
              <input
                type="text"
                id="registration"
                {...register("registration")}
                placeholder="Qual seu registro profissional?"
              />
              {errors.registration && (
                <p className="text-red-500 text-sm">Campo obrigatório</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              <div className="space-y-3">
                <label htmlFor="">Você oferece valor social?</label>

                <div className="flex items-center justify-start gap-2">
                  <ToggleSwitch
                    isChecked={hasSocialValue}
                    onToggle={setHasSocialValue}
                  />
                  <span className="text-base text-gray-700">
                    {hasSocialValue ? "Sim" : "Não"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="">Você está oferencendo vagas gratuitas?</label>

                <div className="flex items-center justify-start gap-2">
                  <ToggleSwitch
                    isChecked={hasDutyFree}
                    onToggle={setHasDutyFree}
                  />
                  <span className="text-base text-gray-700">
                    {hasDutyFree ? "Sim" : "Não"}
                  </span>
                </div>

                {hasDutyFree ? (
                  <>
                    <div className="space-y-3">
                      <label htmlFor="dutyFreeCount">Quantas?</label>
                      <input
                        type="number"
                        id="dutyFreeCount"
                        {...register("dutyFreeCount")}
                        placeholder="Quantidade de gratuitas"
                        className="placeholder:text-sm"
                      />
                      {errors.dutyFreeCount && (
                        <p className="text-red-500 text-sm">
                          Campo obrigatório
                        </p>
                      )}
                      <small className="text-xs text-gray-800">
                        Você precisará atualizar este campo conforme as vagas
                        vão sendo preenchidas
                      </small>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              <div className="space-y-3">
                <label htmlFor="registration">
                  Oferece atendimento online?
                </label>

                <div className="flex items-center justify-start gap-2">
                  <ToggleSwitch isChecked={online} onToggle={setOnline} />
                  <span className="text-base text-gray-700">
                    {online ? "Sim" : "Não"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="registration">
                  Oferece atendimento presencial?
                </label>

                <div className="flex items-center justify-start gap-2">
                  <ToggleSwitch isChecked={inPerson} onToggle={setInPerson} />
                  <span className="text-base text-gray-700">
                    {inPerson ? "Sim" : "Não"}
                  </span>
                </div>

                {inPerson ? (
                  <>
                    <div className="">
                      <label htmlFor="address">Qual endereço?</label>
                      <input
                        type="text"
                        id="address"
                        {...register("address")}
                        placeholder="Rua, número e bairro"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">
                          Campo obrigatório
                        </p>
                      )}
                      <small className="text-xs text-gray-800">
                        Informe o endereço completo (rua + número + bairro)
                      </small>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10" />

        <div className="w-full mb-[5rem]">
          <button
            className="btn-save float-right"
            onClick={handleSubmit(onSubmit)}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerProfileForm;
