const bookingForm = document.querySelector("#booking-form");
const bookingSubmit = document.querySelector("#booking-submit");
const formStatus = document.querySelector("#form-status");
const routeInput = document.querySelector("#route");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const nameInput = document.querySelector("#name");
const notesInput = document.querySelector("#notes");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const whatsappNumber = "";
const supabaseUrl = "";
const supabaseAnonKey = "";

function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function getBookingPayload() {
  return {
    route: routeInput.value,
    preferred_date: dateInput.value || null,
    preferred_time: timeInput.value || null,
    customer_name: nameInput.value.trim() || null,
    notes: notesInput.value.trim() || null,
    source: "venturojeri.com",
  };
}

function buildMessage() {
  const payload = getBookingPayload();
  const date = payload.preferred_date || "data a combinar";
  const time = payload.preferred_time || "horario a combinar";
  const name = payload.customer_name || "Cliente";

  const lines = [
    `Ola, sou ${name}. Quero reservar um passeio Venturo Jeri Offroad.`,
    `Roteiro: ${payload.route}`,
    `Data: ${date}`,
    `Horario: ${time}`,
  ];

  if (payload.notes) {
    lines.push(`Observacoes: ${payload.notes}`);
  }

  return lines.join("\n");
}

function buildWhatsappUrl() {
  const target = whatsappNumber ? `/${whatsappNumber}` : "";
  return `https://wa.me${target}?text=${encodeURIComponent(buildMessage())}`;
}

async function saveLead() {
  if (!isSupabaseConfigured()) {
    return;
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/booking_leads`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(getBookingPayload()),
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel salvar a reserva.");
  }
}

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  bookingSubmit.disabled = true;
  formStatus.textContent = isSupabaseConfigured() ? "Registrando seu pedido..." : "Abrindo WhatsApp...";

  try {
    await saveLead();
    formStatus.textContent = "Pedido registrado. Abrindo WhatsApp...";
  } catch (error) {
    formStatus.textContent = "Nao consegui registrar no sistema, mas vou abrir o WhatsApp.";
  } finally {
    window.open(buildWhatsappUrl(), "_blank", "noreferrer");
    bookingSubmit.disabled = false;
  }
});

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.src;
    lightboxImage.alt = item.querySelector("img").alt;
    lightbox.hidden = false;
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.hidden = true;
  lightboxImage.src = "";
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.hidden = true;
    lightboxImage.src = "";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hidden) {
    lightbox.hidden = true;
    lightboxImage.src = "";
  }
});
