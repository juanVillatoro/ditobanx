import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/auth.services";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState("");

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !name || !balance) {
            setError("Please fill in all fields")
            setLoading(false)
        }

        const balanceNum = parseFloat(balance);
        if (isNaN(balanceNum) || balanceNum <= 0) {
            setError("The balance must be a positive number.");
            return;
        }

        setLoading(true)
        setError(null)

        try {
            const response = await createUser({ name, password, email, balance: balanceNum })

            if (!response) {
                setError("Something went wrong")
                setLoading(false)
                return
            }

            setName(response.data.name)
            setEmail(response.data.email)
            setPassword(response.data.password)
            setBalance(response.data.balance)
            navigate('/')
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "object" && err !== null && "message" in err) {
                setError((err as { message: string }).message);
            } else {
                setError("Error creating user");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <h2>Create User and Balance</h2>

                {error && <p>{error}</p>}

                <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                />

                <input
                    type="number"
                    placeholder="Balance of your wallet"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    disabled={loading}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Create"}
                </button>

            </form>
        </div>
    )
}

export default Register;