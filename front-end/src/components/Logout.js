import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificăm dacă utilizatorul este logat
        const token = localStorage.getItem("token");

        if (token) {
            // Afișează o singură dată o confirmare
            const confirmLogout = window.confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                // Șterge datele de autentificare
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                localStorage.removeItem("username");

                // Redirecționează utilizatorul la pagina de login
                navigate("/login");
            } else {
                // Dacă anulează, navighează la pagina anterioară
                navigate(-1);
            }
        } else {
            // Dacă utilizatorul nu este logat, redirecționează către login
            navigate("/login");
        }
    }, [navigate]);

    return null; // Nu afișează nimic în UI
}
