import { useState, useEffect } from "react";
import {
  Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Paper, Button,
  IconButton, Snackbar
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../axios/axios";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });
  const navigate = useNavigate();

  const showAlert = (severity, message) => setAlert({ open: true, severity, message });
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  async function getUsers() {
    try {
      const response = await api.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.log("Erro ", error);
    }
  }

  async function deleteUser(id) {
    try {
      await api.deleteUser(id);
      await getUsers();
      showAlert("success", "Usuário excluído com sucesso!");
    } catch (error) {
      showAlert("error", error.response?.data?.error || "Erro desconhecido");
    }
  }

  const logout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  useEffect(() => {
    getUsers();
  }, []);

  const userRows = users.map((user) => (
    <TableRow key={user.id_usuario}>
      <TableCell align="center">{user.name}</TableCell>
      <TableCell align="center">{user.email}</TableCell>
      <TableCell align="center">{user.cpf}</TableCell>
      <TableCell align="center">
        <IconButton onClick={() => deleteUser(user.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      {users.length === 0 ? (
        <p> Carregando usuários... </p>
      ) : (
        <div>
          <h5>Lista de usuários</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead style={{ backgroundColor: "brown", borderStyle: "solid" }}>
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">CPF</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{userRows}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" component={Link} to="/" onClick={logout}>
            SAIR
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListUsers;
