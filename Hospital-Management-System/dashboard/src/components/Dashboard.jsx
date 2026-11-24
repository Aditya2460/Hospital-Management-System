import "./Dashboard.css";
import { API_URL } from "../api.js";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorsCount, setDoctorsCount] = useState(0);

  const { isAuthenticated, admin, authChecked } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!authChecked || !isAuthenticated) return;
      try {
        const { data } = await axios.get(
          `${API_URL}/api/v1/appointment/getall`,
          { withCredentials: true }
        );
        setAppointments(data.appointments || []);
      } catch (error) {
        setAppointments([]);
        toast.error(error.response?.data?.message || "Unable to load appointments");
      }
    };
    const fetchDoctorsCount = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/v1/user/doctors`, { withCredentials: true });
        setDoctorsCount((data.doctors || []).length);
      } catch (error) {
        setDoctorsCount(0);
      }
    };
    if (authChecked && isAuthenticated) {
      fetchAppointments();
      fetchDoctorsCount();
    }
  }, [authChecked, isAuthenticated]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };

  if (!authChecked) {
    return <main className="page auth-loading" role="status">Checking your session…</main>;
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Here is your hospital overview. Review appointments, monitor requests, and manage your care team from one place.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctorsCount}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleString() : "—"}</td>
                      <td>{appointment.doctor ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}` : "Doctor unavailable"}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : <tr><td colSpan="6" className="empty-table">No appointments have been submitted yet.</td></tr>}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
