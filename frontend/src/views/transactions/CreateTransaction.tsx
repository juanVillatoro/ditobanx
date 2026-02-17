import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTransfer } from "../../services/transfer.service";
import { getAllUsers } from "../../services/auth.services";
import type { User } from "../../types/user.types";
import { v4 as uuidv4 } from "uuid"


const TransferForm = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [fromUserId, setFrom] = useState("");
    const [toUserId, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [success, setSuccess] = useState(false);

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await getAllUsers();
            setUsers(response);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "object" && err !== null && "message" in err) {
                setError((err as { message: string }).message);
            } else {
                setError("Error creating transaction");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRedirect = () => {
        navigate("/users")
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const idempotencyKey = uuidv4();


        if (!fromUserId || !toUserId || !amount || !idempotencyKey) {
            setError("Please fill in all fields")
            setLoading(false)
        }

        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setError("The balance must be a positive number.");
            return;
        }

        setLoading(true)
        setError(null)

        try {
            const response = await createTransfer({ fromUserId, toUserId, amount: amountNum, idempotencyKey })

            if (!response) {
                setError("Something went wrong")
                setLoading(false)
                return
            }

            setFrom(response.data.fromUserId)
            setTo(response.data.toUserId)
            setSuccess(true)
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

    const toUserOptions = users.filter((u) => u.id !== fromUserId);

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <h2>Transfer to user</h2>
                <button onClick={() => handleRedirect()} disabled={loading}>Back</button>

                {error && <p>{error}</p>}

                {success && <p>Transfer successfully of {amount}</p>}



                <select
                    value={fromUserId}
                    onChange={(e) => {
                        setFrom(e.target.value);
                        if (e.target.value === toUserId) setTo("");
                    }}
                    disabled={loading}
                    required
                >
                    <option value="" disabled>Select who sends</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name} — Balance: {user.Wallet?.balance ?? 0}
                        </option>
                    ))}
                </select>

                <select
                    value={toUserId}
                    onChange={(e) => setTo(e.target.value)}
                    disabled={loading || !fromUserId}
                    required
                >
                    <option value="" disabled>Select who receives</option>
                    {toUserOptions.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name} — Balance: {user.Wallet?.balance ?? 0}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Amount to transfer"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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

export default TransferForm;