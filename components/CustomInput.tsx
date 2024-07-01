import { Control, FieldPath } from 'react-hook-form';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up');

interface Props {
	control: Control<z.infer<typeof formSchema>>;
	name: FieldPath<z.infer<typeof formSchema>>;
	label: string;
	placeholder: string;
}

export const CustomInput = ({
	control,
	name,
	label,
	placeholder,
}: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='form-item'>
					<FormLabel className='form-label'>{label}</FormLabel>
					<div className='flex w-full flex-col'>
						<FormControl>
							<Input
								placeholder={placeholder}
								className='input-class'
								{...field}
								type={name === 'password' ? 'password' : 'text'}
							/>
						</FormControl>
						<FormMessage className='form-message mt-2' />
					</div>
				</FormItem>
			)}
		/>
	);
};
