'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: '✅ Message Sent!',
      description: 'Thank you for reaching out. We\'ll get back to you within 24 hours.',
    });
    form.reset();
  }

  const contactDetails = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      label: 'Address',
      value: 'Kompally, Hyderabad, Telangana — 500014',
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      label: 'Email',
      value: 'hello@spicemealhub.in',
      href: 'mailto:hello@spicemealhub.in',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="text-center mb-12">
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">💬 We&apos;re Here</p>
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Get In Touch</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Questions, feedback, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Send us a Message</CardTitle>
            </div>
            <CardDescription>For inquiries, feedback, or partnerships — we reply within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Pavan Sai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="pavan@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what's on your mind..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-full" size="lg">
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Info + Hours */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2 shrink-0">{detail.icon}</div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{detail.label}</p>
                    {detail.href ? (
                      <a href={detail.href} className="hover:text-primary transition-colors font-medium">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="font-medium">{detail.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>Opening Hours</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { day: 'Monday – Friday', hours: '11:00 AM – 10:00 PM' },
                { day: 'Saturday', hours: '11:00 AM – 11:00 PM' },
                { day: 'Sunday', hours: '12:00 PM – 11:00 PM' },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between items-center text-sm border-b last:border-0 pb-2 last:pb-0">
                  <span className="font-medium">{day}</span>
                  <span className="text-muted-foreground">{hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
