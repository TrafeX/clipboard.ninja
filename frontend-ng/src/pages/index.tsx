import Clipboard from 'components/Clipboard'
import { SocketContext } from 'context/SocketContext'
import useSocketClient from 'hooks/useSocketClient'
import { useContext } from 'react'

export default function Home() {

  const socket = useContext(SocketContext);
  
  const { ownRoomNumber, connectedToRoom, usersInRoom, messages } = useSocketClient(socket);
  return (
    <Clipboard ownRoomNumber={ownRoomNumber} connectedToRoom={connectedToRoom} usersInRoom={usersInRoom} messages={messages} />
  )
}
