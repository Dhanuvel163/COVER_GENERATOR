import React from 'react';
import Header from '@/components/Header';
import GlassBackground from '@/components/GlassBackground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <GlassBackground />
            <Header />
            <main className="relative z-10 px-6 py-6 md:py-16">
                <Card className="glass-card container mx-auto p-4">
                    <CardHeader>
                        <CardTitle className="text-center px-0 md:px-4">Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className='px-0 md:px-4'>
                        <p className="mb-2">This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from Cover AI (the “Site”).</p>
                        
                        <h2 className="text-2xl font-semibold mt-6 mb-3">Personal Information We Collect</h2>
                        <p className="mb-2">When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”</p>
                        <p className="mb-2">We collect Device Information using the following technologies:</p>
                        <ul className="list-disc list-inside ml-4 mb-2">
                            <li>“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</li>
                            <li>“Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                            <li>“Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">How We Use Your Personal Information</h2>
                        <p className="mb-2">We use the Order Information that we collect generally to fulfill any orders placed through the Site. Additionally, we use this Order Information to:</p>
                        <ul className="list-disc list-inside ml-4 mb-2">
                            <li>Communicate with you;</li>
                        </ul>
                        <p className="mb-2">We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">Sharing Your Personal Information</h2>
                        <p className="mb-2">We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Google Analytics to help us understand how our customers use the Site—you can read more about how Google uses your Personal Information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>
                        <p className="mb-2">Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">Your Rights</h2>
                        <p className="mb-2">If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">Data Retention</h2>
                        <p className="mb-2">When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to erase this information.</p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">Changes</h2>
                        <p className="mb-2">We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">Contact Us</h2>
                        <p className="mb-2">For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at dhanuram100@gmail.com or by mail using the details provided below:</p>
                        <p>Cover AI<br/></p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
