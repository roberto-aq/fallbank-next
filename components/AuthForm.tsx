'use client';

import { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { LogoMobile } from './LogoMobile';
import { authFormSchema } from '@/lib/utils';
import { CustomInput } from './CustomInput';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import { PlaidLink } from './PlaidLink';

export const AuthForm = ({ type }: { type: string }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const formSchema = authFormSchema(type);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address1: '',
			city: '',
			postalCode: '',
			dateOfBirth: '',
			ssn: '',
			state: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsLoading(true);

		try {
			// AppWrite & create plaid token

			if (type === 'sign-up') {
				const userData = {
					firstName: data.firstName!,
					lastName: data.lastName!,
					address1: data.address1!,
					city: data.city!,
					state: data.state!,
					postalCode: data.postalCode!,
					dateOfBirth: data.dateOfBirth!,
					ssn: data.ssn!,
					email: data.email,
					password: data.password,
				};

				const newUser = await signUp(userData);

				setUser(newUser);
			}

			if (type === 'sign-in') {
				const response = await signIn({
					email: data.email,
					password: data.password,
				});

				if (response) return router.push('/');
			}
		} catch (error) {
			console.log(error);
			setErrorMessage('No pudo iniciar sesión, Vuelva a intentar');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<section className='auth-form'>
				<header className='flex flex-col gap-5 md:gap-8'>
					<LogoMobile />

					<div className='flex flex-col gap-1 md:gap-3'>
						<h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
							{user
								? 'Link Account'
								: type === 'sign-in'
								? 'Sign In'
								: 'Sign Up'}

							<p className='text-16 font-normal text-gray-600'>
								{user
									? 'Link your account to get started'
									: 'Please enter your details'}
							</p>
						</h1>
					</div>
				</header>

				{user ? (
					<div className='flex flex-col gap-4'>
						<PlaidLink user={user} variant='primary' />
					</div>
				) : (
					<>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='space-y-8'
							>
								{type === 'sign-up' && (
									<>
										<div className='flex gap-4'>
											<CustomInput
												control={form.control}
												name='firstName'
												label='First Name'
												placeholder='Enter your firstName'
											/>
											<CustomInput
												control={form.control}
												name='lastName'
												label='Last Name'
												placeholder='Enter your lastname'
											/>
										</div>

										<CustomInput
											control={form.control}
											name='address1'
											label='Address'
											placeholder='Enter your specific address'
										/>
										<CustomInput
											control={form.control}
											name='city'
											label='City'
											placeholder='Enter your city'
										/>

										<div className='flex gap-4'>
											<CustomInput
												control={form.control}
												name='state'
												label='State'
												placeholder='Example: NY'
											/>
											<CustomInput
												control={form.control}
												name='postalCode'
												label='Postal Code'
												placeholder='Example: 1110'
											/>
										</div>

										<div className='flex gap-4'>
											<CustomInput
												control={form.control}
												name='dateOfBirth'
												label='Date of Birth'
												placeholder='YYYY-MM-DD'
											/>
											<CustomInput
												control={form.control}
												name='ssn'
												label='SSN'
												placeholder='Example: 1234'
											/>
										</div>
									</>
								)}

								<CustomInput
									control={form.control}
									name='email'
									label='email'
									placeholder='Enter your email'
								/>

								<CustomInput
									control={form.control}
									name='password'
									label='password'
									placeholder='Enter your password'
								/>

								<div className='flex flex-col gap-4'>
									<Button
										type='submit'
										className='form-btn'
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<Loader2 size={20} className='animate-spin' />{' '}
												&nbsp; Loading...
											</>
										) : type === 'sign-in' ? (
											'Sign In'
										) : (
											'Sign Up'
										)}
									</Button>
								</div>
							</form>
						</Form>

						<footer className='flex justify-center gap-1'>
							<p className='text-14 font-normal text-gray-600'>
								{type === 'sign-in'
									? "Don't have an account?"
									: 'Already have an account?'}
							</p>
							<Link
								href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
								className='form-link'
							>
								{type === 'sign-in' ? 'Sign Up' : 'Sign In'}
							</Link>
						</footer>
					</>
				)}
			</section>
		</>
	);
};
