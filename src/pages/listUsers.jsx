import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ open: false, severity: "", message: "" });

  const showAlert = (severity, message) => setAlert({ open: true, severity, message });
  
  const handleCloseAlert = () => setAlert({ ...alert, open: false });
  
  const navigate = useNavigate();

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
        <IconButton onClick={() => deleteUser(user.id_usuario)}>
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

          <Button fullWidth variant="contained" component={Link} to="/events" >
            Ir para lista de eventos 
          </Button>
        </div>
      )}
    </div>
  );
}

export default ListUsers;