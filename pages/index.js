import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import Map from './components/Map';
import Link from 'next/link';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Home() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push('/login');
      }
    })
  }, []);

  return (
    <Wrapper>
      <Map />
      <ActionItems >
        <Header>

          <UberLogo src='https://th.bing.com/th/id/R.3f6d80d93a84098d17ff19c74811f7f5?rik=X2%2fiK6xj1YXIqg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_408223.png&ehk=%2f6TqMiISObJTntLY07zevFqnOOWmHJjO%2f6oUpKyDcaY%3d&risl=&pid=ImgRaw&r=0' />

          <Profile>

            <Name>{user && user.name}</Name>
            <UserImage
              src={user && user.photoUrl}
              onClick={() => signOut(auth)}
            />

          </Profile>

        </Header>
        <ActionButtons>

          <Link href='/search' >
            <ActionButton>
              <ActionButtonImage src='https://purepng.com/public/uploads/large/purepng.com-trucktruckpickup-truckbig-trucktrucks-1701527681300t4kda.png' />
              Pickup
            </ActionButton>
          </Link>

          <ActionButton>
            <ActionButtonImage src='https://th.bing.com/th/id/R.254afd18c2e64ab17cfa03c70dffe888?rik=iahxSp8I18jEYQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fvan-png-hd-toyota-hiace-lwb-1920.png&ehk=9fqoYG%2bc1mL%2fN0wkRNawz9h%2becIRIIGpAS50mzM7SG8%3d&risl=&pid=ImgRaw&r=0' />
            Freed
          </ActionButton>

          <ActionButton>
            <ActionButtonImage src='https://i.ibb.co/5RjchBg/uberschedule.png' />
            Reserve
          </ActionButton>
          
        </ActionButtons>

        <InputButton>
          Where to
        </InputButton>

      </ActionItems>
    </Wrapper>
  )
};

const Wrapper = tw.div`
  flex flex-col h-screen
`

const ActionItems = tw.div`
  flex-1 p-4
`

const Header = tw.div`
  flex justify-between items-center
`

const UberLogo = tw.img`
  h-28
`

const Profile = tw.div`
  flex items-center
`

const Name = tw.div`
  mr-4 w-20 text-sm
`

const UserImage = tw.img`
  h-12 w-12 rounded-full border border-gray-200 p-px object-cover cursor-pointer
`

const ActionButtons = tw.div`
  flex
`

const ActionButton = tw.div`
  flex flex-col flex-1 bg-gray-200 m-1 h-32 items-center justify-center rounded-lg transform hover:scale-105 transition text-xl
`

const ActionButtonImage = tw.img`
  h-3/5
`

const InputButton = tw.div`
  h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8
`