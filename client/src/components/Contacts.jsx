import React, {useState, useEffect} from 'react'
import whisper from '../assets/whisper.svg'
import styled from 'styled-components'
export default function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    useEffect(() => {
        if(currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
		
		
        setCurrentSelected(index)
        changeChat(contact)
    }

  return (
    <>
        {
            currentUserImage && currentUserName && (
                <Container>
                    <div className='brand'>
                        <img src={whisper} alt='logo'/>
                        <h3>Whisper</h3>
                    </div>
                    <div className='contacts'>
                        {contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? 'selected' : ''}`} key={index} onClick={() => changeCurrentChat(index, contact)} alt="avatar">
                                    <div className='avatar'>
                                        <img src={`data:image/svg+xml;base64, ${contact.avatarImage}`} alt='avatar'/>     
                                    </div>
                                    <div className='username'>
                                        <h3>{ contact.username ?
										contact.username : contact.chat} </h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='current-user'>
                        <div className='avatar'>
                            <img src={`data:image/svg+xml;base64, ${currentUserImage}`} alt="avatar"/> 
                        </div>
                        <div className='username'>
                            <h2>{currentUserName}</h2>
                        </div>
                    </div>
                </Container>
            )
        }
    </>
  )
}
const Container = styled.div`
  display: grid;
	flex-direction: row;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #698ecf;
	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		img {
			height: 3rem;
		}
		h3{
			text-transform: uppercase;
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		text-align: center;
		overflow-y: auto;
		overflow-x: hidden;
		gap: .8rem;
		&::-webkit-scrollbar{
			width: .2rem;
		}
		&::-webkit-scrollbar-thumb{
			background-color: black;
			width: .1rem;
			border-radius: 1rem;
		}
	}
	.contact {
		background-color: #ffffff39;
		min-height: 5rem;
		width: 90%;
		cursor: pointer;
		border-radius: .2rem;
		padding: .4rem;
		gap: 1rem;
		align-items: center;
		display: flex;
		transition: .5s ease-in-out;
		img {
			height: 3rem
		}
	}
	.selected {
			background-color: #081b3f;
			width: 99% ;
			color: white;
	}
	.current-user{
		background-color: #6b9aeb;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		.avatar {
			img{
				height: 4rem;
			}
		}
	}
	
`