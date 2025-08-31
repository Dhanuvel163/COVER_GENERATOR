import React, { useState } from 'react';
import Header from '@/components/Header';
import GlassBackground from '@/components/GlassBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/api/contact';
import { toast } from "sonner";
import { errorStyle, successStyle } from '@/lib/toastStyles';

const ContactUs: React.FC = () => {
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = { mail:email, subject:title, description };
        setIsSubmitting(true);
        try {
            await submitContactForm(data);
            toast.success('Message sent successfully!', successStyle);
            setEmail('');
            setTitle('');
            setDescription('');
        } catch (error: any) {
            console.error('Error:', error);
            if(error?.response?.data?.show_message){
                toast.error(error?.response?.data?.message,errorStyle);
            }else toast.error("Error Contacting.",errorStyle);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <GlassBackground />
            <Header />
            <main className="relative z-10 px-2 md:px-6 py-6 md:py-16">
                <Card className="glass-card container mx-auto p-4">
                    <CardHeader className='px-2 md:px-6'>
                        <CardTitle className="text-center">Contact Us</CardTitle>
                    </CardHeader>
                    <CardContent className='px-2 md:px-6'>
                        <form onSubmit={handleSubmit} className="rounded-lg">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Your Email:</label>
                                <Input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Subject:</label>
                                <Input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                <Textarea 
                                    id="description" 
                                    name="description" 
                                    rows={5}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></Textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <Button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white glass-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default ContactUs;
