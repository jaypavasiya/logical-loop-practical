import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { axiosGet } from '../../services';
import { User, Meta } from '../../interface';


interface Response {
    data: User[]
    meta: {
        pagination: Meta
    }
}


const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [pageMeta, setPageMeta] = useState({} as Meta);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        fetchUsers();
    }, []);

    const fetchUsers = async (param: any = undefined) => {
        try {
            const response : Response = await axiosGet(`/users`, param ? param : {});
            setUsers(response.data);
            setPageMeta(response.meta.pagination);
            setIsLoading(false);
          } catch (error) {
            setIsLoading(false);
            console.error('Error fetching users:', error);
          }
    };
    const handleUserClick = (user: User) => {
        navigate(`/users/${user.id}`);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 130, renderHeader: () => <strong>ID</strong> },
        { field: 'name', headerName: 'Name', width: 200, renderHeader: () => <strong>Name</strong> },
        { field: 'email', headerName: 'Email', width: 300, renderHeader: () => <strong>Email</strong> },
        { field: 'gender', headerName: 'Gender', width: 200, renderHeader: () => <strong>Gender</strong> },
        { field: 'status', headerName: 'Status', width: 200, renderHeader: () => <strong>Status</strong> },
    ];

    const handlePagination = async (params: any) => {
        const { page, pageSize } = params;
        setIsLoading(true);
        try {
            fetchUsers({ page: page, limit: pageSize });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    return (
        <Container>
            <h1>Users</h1>
            <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10]}
                paginationMode="server"
                onRowClick={(params) => { handleUserClick(params.row as User) }
                }
                onPaginationModelChange={handlePagination}
                rowCount={pageMeta.total}
                loading={isLoading}

            />

        </Container>
    );
}

export default Users;
