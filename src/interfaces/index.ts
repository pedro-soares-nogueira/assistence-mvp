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
