import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/auth.services";
import type { User } from "../../types/user.types";

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRedirect = () => {
        navigate("/transfer")
    }

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
                setError("Error al iniciar sesión");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Users</h2>
            <button onClick={() => handleRedirect()} disabled={loading}>Transfer Money</button>
            {error && <p className="alert alert-danger">{error}</p>}
            {loading && <p>Cargando usuarios...</p>}

            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Currency</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center">
                                No hay usuarios disponibles
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.Wallet.balance}</td>
                                <td>{user.Wallet.currency}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
