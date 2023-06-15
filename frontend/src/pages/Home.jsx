import {Link} from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>What do u need help with?</h1>
        <p>Please choose an option below</p>
      </section>
      <Link to='/new-ticket' className='btn btn-revers btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to='/tickers' className='btn btn-block'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default Home
