import { BASE_URL } from '@/constants/api';

interface ContactFormValues {
    mail: string;
    subject: string;
    description: string;
}

export const submitContactForm = async (data: ContactFormValues) => {
    try {
        const response = await fetch(`${BASE_URL}api/user/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send message');
        }

        return await response.json();
    } catch (error) {
        console.error("Error in submitContactForm:", error);
        throw error;
    }
};
