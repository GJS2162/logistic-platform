import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';
import tw from 'tailwind-styled-components/dist/tailwind';

function Login() {

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/');
            };
        });
    }, []);

    return (
        <Wrapper>
            <UberLogo src='https://th.bing.com/th/id/R.3f6d80d93a84098d17ff19c74811f7f5?rik=X2%2fiK6xj1YXIqg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fdownload_408223.png&ehk=%2f6TqMiISObJTntLY07zevFqnOOWmHJjO%2f6oUpKyDcaY%3d&risl=&pid=ImgRaw&r=0' />
            <Title>Login to access your account</Title>
            <HeadImage src='https://i.ibb.co/CsV9RYZ/login-image.png' />
            <SignInButton onClick={() => signInWithPopup(auth, provider)}>Sign in with Google</SignInButton>
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
    flex flex-col h-screen bg-gray-200 p-4
`

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full
`

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`
const Title = tw.div`
    text-5xl pt-4 text-gray-500
`

const HeadImage = tw.img`
    object-contain w-full
`