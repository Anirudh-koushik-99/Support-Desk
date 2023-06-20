import axios from "axios";

const API_URL = '/api/tickets/'

//CREATE NEW TICKET
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

//GET USER TICKETS
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//GET USER TICKET
const getTicket = async (ticketId,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL+ ticketId, config)

    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicket
}

export default ticketService