interface ConversionApiLead {
  email: string;
  nome: string;
  phone: string;
}

const eventID = window.facebookEventID;
const fbc = window.facebookFbc;
const fbp = window.facebookFbp;

export const ConversionApiLead = async ({
  nome,
  email,
  phone,
}: ConversionApiLead) => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "Lead",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    value: 0.0,
    currency: "BRL",
    fbc: fbc || "",
    fbp: fbp || "",

    nome: nome,
    email: email,
    whatsapp: phone,
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const ConversionApiPageView = async () => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "PageView",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    fbc: fbc || "",
    fbp: fbp || "",

    email: "",
    whatsapp: "",
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const ConversionApiViewContent = async () => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "ViewContent",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    fbc: fbc || "",
    fbp: fbp || "",
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const ConversionApiContact = async () => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "Contact",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    fbc: fbc || "",
    fbp: fbp || "",
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const ConversionApiSearch = async () => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "Search",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    fbc: fbc || "",
    fbp: fbp || "",
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const ConversionApiPurchase = async () => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "Purchase",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    value: 0.0,
    currency: "BRL",
    fbc: fbc || "",
    fbp: fbp || "",
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const ConversionApiInitiateCheckout = async () => {
  const userAgent = navigator.userAgent;

  const data = {
    event_name: "InitiateCheckout",
    event_id: eventID,
    client_user_agent: userAgent,
    client_ip_address: "0.0.0.0",
    fbc: fbc || "",
    fbp: fbp || "",
  };

  fetch("api/fb-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// async function getClientIPAddress() {
//   try {
//     const response = await fetch("https://api.ipify.org?format=json");
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     console.error("Error fetching IP address:", error);
//     return null;
//   }
// }
