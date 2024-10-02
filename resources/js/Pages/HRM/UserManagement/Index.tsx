import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Index = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users').then((response) => {
            setUsers(response.data);
        });
    }, []);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Users Management</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add User</button>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b">Name</th>
                        <th className="px-4 py-2 border-b">Email</th>
                        <th className="px-4 py-2 border-b">Role</th>
                        <th className="px-4 py-2 border-b">Department</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-2 border-b">{user.name}</td>
                            <td className="px-4 py-2 border-b">{user.email}</td>
                            <td className="px-4 py-2 border-b">{user.role}</td>
                            <td className="px-4 py-2 border-b">{user.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;