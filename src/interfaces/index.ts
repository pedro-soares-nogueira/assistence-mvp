export interface IPartner {
  properties: {
    Name: { id: string; type: string; title: { plain_text: string }[] };
    Avatar: {
      id: string;
      type: string;
      files: {
        name: string;
        type: string;
        file: {
          url: string;
          expiry_time: string;
        };
      }[];
    };
    Details: {
      id: string;
      type: string;
      rich_text: {
        plain_text: string;
      }[];
    };
    Facebook: { id: string; type: string; url: string };
    Instagram: { id: string; type: string; url: string };
    Whatsapp: { id: string; number: number };
    Specialty: {
      id: string;
      type: string;
      select: {
        id: string;
        name: string;
        color: string;
      };
    };
    Tags: {
      id: string;
      type: string;
      multi_select: {
        id: string;
        name: string;
        color: string;
      }[];
    };
    Valor_social: {
      id: string;
      checkbox: boolean;
    };
    Gratuitas: {
      id: string;
      checkbox: boolean;
    };
    Grat_quantity: {
      id: string;
      number: number;
    };
    Disasters: {
      id: string;
      checkbox: boolean;
    };
    Slug: { rich_text: { text: { content: string } }[] };
    CRP: { rich_text: { text: { content: string } }[] };
    CRM: { rich_text: { text: { content: string } }[] };
    Avatar_url: { url: string };
  };
}

export interface Specialty {
  id: string;
  name: string;
  color: string;
}

export interface PartnerProfile {
  id: string;
  user_id: string;
  fantasy_name?: string | undefined;
  prof_email?: string | undefined;
  bio?: string | null;
  avatar_url?: string | null;
  city_ibge_id?: string | null;
  tags?: string[] | null;
  specialty_id?: string | null;
  whatsapp?: string | undefined;
  instagram?: string | undefined;
  facebook?: string | undefined;
  has_social_value?: boolean | null;
  has_duty_free?: boolean | null;
  duty_free_count?: number | null;
  online?: boolean | null;
  in_person?: boolean | null;
  address?: string | null;
  professional_registration?: string;
  specialty?: Specialty | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  slug: string;
  avatar_url: string | null;
  created_at: string;
  partnerProfile: PartnerProfile[];
  // role: string;
}
