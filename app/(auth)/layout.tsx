import Image from 'next/image';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex min-h-screen w-full justify-between font-inter'>
			{children}
			<div className='auth-asset'>
				<Image
					src={'/icons/auth-image.svg'}
					alt='Auth image'
					width={500}
					height={500}
					priority
				/>
			</div>
		</main>
	);
}
