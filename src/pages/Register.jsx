import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaCalendar, FaMapMarkerAlt, FaVenusMars, FaCreditCard, FaIdCard } from "react-icons/fa";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        username: "",
        language: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: "",
        disabilities: [],
        image: "",
        acceptTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const disabilityOptions = [
        { name: "visiva", label: "Disabilità Visiva" },
        { name: "motoria", label: "Disabilità Motoria" },
        { name: "uditiva", label: "Disabilità Uditiva" },
        { name: "alimentare", label: "Disturbo Alimentare" },
        { name: "altro", label: "Altro" },
    ];

    const handleChangeB = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox" && disabilityOptions.some(dis => dis.name === name)) {
            setFormData((prevData) => {
                const updatedDisabilities = checked
                    ? [...prevData.disabilities, { name }]
                    : prevData.disabilities.filter(dis => dis.name !== name);
                return { ...prevData, disabilities: updatedDisabilities };
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    return (
        <div className="flex items-center justify-center w-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6"
             style={{ height: "calc(200vh)" }}>
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Registrati</h2>
                <form className="flex flex-col gap-4">
                    {/* Nome */}
                    <label className="text-gray-700 font-medium">Nome</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Inserisci il tuo nome" />

                    {/* Cognome */}
                    <label className="text-gray-700 font-medium">Cognome</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Inserisci il tuo cognome" />

                    {/* Username */}
                    <label className="text-gray-700 font-medium">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Inserisci il tuo username" />

                    {/* Linagua */}
                    <label className="text-gray-700 font-medium">Lingua Preferenziale</label>
                    <input type="text" name="language" value={formData.language} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Inserisci la lingua preferenziale" />

                    {/* Email */}
                    <label className="text-gray-700 font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Inserisci la tua email" />

                    {/* Data di nascita */}
                    <label className="text-gray-700 font-medium">Data di nascita</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="border p-3 rounded-lg" />

                    {/* Lista di disabilità*/}
                    <label className="text-gray-700 font-medium">Disabilità</label>
                    {disabilityOptions.map((dis) => (
                        <div className="flex items-center" key={dis.name}>
                            <input type="checkbox" name={dis.name} checked={formData.disabilities.some(d => d.name === dis.name)} onChange={handleChangeB} className="w-5 h-5 mr-2" />
                            <label className="text-gray-700 text-sm">{dis.label}</label>
                        </div>
                    ))}

                    {/* Password */}
                    <label className="text-gray-700 font-medium">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Inserisci la tua password" />

                    {/* Conferma Password */}
                    <label className="text-gray-700 font-medium">Conferma Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Ripeti la password" />

                    {/* Accettazione trattamento dati */}
                    <div className="flex items-center">
                        <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="w-5 h-5 mr-2" />
                        <label className="text-gray-700 text-sm">Accetto il trattamento dei dati personali</label>
                    </div>

                    {/* Pulsante Registrati */}
                    <button type="button" className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold text-xl hover:bg-purple-600 transition duration-300">Registrati</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
