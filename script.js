/* ==========================================
   CONFIGURAÇÕES
========================================== */

const crypt = "40913290.0001-89";


/* ==========================================
   ELEMENTOS
========================================== */

const pixKeyElement = document.getElementById("pixKey");
const copyButton = document.getElementById("copyButton");
const copyMessage = document.getElementById("copyMessage");
const toast = document.getElementById("toast");
const qrCodeElement = document.getElementById("qrcode");


/* ==========================================
   EXIBIR CHAVE PIX
========================================== */

pixKeyElement.textContent = crypt;


/* ==========================================
   GERAR QR CODE
========================================== */

function gerarQRCode() {

    if (!qrCodeElement) {
        return;
    }

    if (typeof QRCode === "undefined") {
        return;
    }

    new QRCode(qrCodeElement, {
        text: crypt,
        width: 170,
        height: 170,
        colorDark: "#4d3840",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });
}


/* ==========================================
   COPIAR PIX
========================================== */

async function copiarPix() {

    try {

        await navigator.clipboard.writeText(crypt);

        mostrarMensagem();

    } catch (error) {

        /* Fallback para navegadores que não permitem
           Clipboard API */

        const campo = document.createElement("textarea");

        campo.value = crypt;

        campo.style.position = "fixed";
        campo.style.opacity = "0";

        document.body.appendChild(campo);

        campo.focus();
        campo.select();

        try {
            document.execCommand("copy");

            mostrarMensagem();

        } catch (fallbackError) {

            alert(
                "Não foi possível copiar automaticamente. " +
                "Copie a chave PIX manualmente."
            );
        }

        document.body.removeChild(campo);
    }
}


/* ==========================================
   MENSAGEM DE CÓPIA
========================================== */

let toastTimer;

function mostrarMensagem() {

    copyMessage.classList.add("active");

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        copyMessage.classList.remove("active");

        toast.classList.remove("show");

    }, 2500);
}


/* ==========================================
   EVENTO DO BOTÃO
========================================== */

copyButton.addEventListener(
    "click",
    copiarPix
);


/* ==========================================
   INICIALIZAÇÃO
========================================== */

gerarQRCode();
