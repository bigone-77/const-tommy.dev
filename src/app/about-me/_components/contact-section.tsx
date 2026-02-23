'use client';

import { useState } from 'react';

import { Send } from 'lucide-react';

import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { H2Typography, PTypography } from '@/components/ui/typography';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    const field = id.replace('contact-', '');
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendMail = () => {
    const { name, subject, message } = formData;

    if (!name || !subject || !message) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const mailtoUrl = `mailto:taeil012@gmail.com?subject=${encodeURIComponent(
      `[문의] ${subject} (보낸이: ${name})`,
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <section id='contact' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='flex flex-col gap-10'>
          <H2Typography className='border-none pb-0 text-left'>
            ✉️ CONTACT
          </H2Typography>

          <PTypography className='text-muted-foreground w-full text-base leading-relaxed break-keep md:text-base lg:text-lg lg:leading-loose'>
            저는 여기저기 흩어져 있는 정보를 한데 모아 정리하고 기록하는 일을
            즐깁니다. 혼자만 알고 있는 지식보다{' '}
            <span className='text-foreground font-bold'>
              '나의 지식'과 '당신의 경험'이 만나 팀 네트워킹으로 이어질 때{' '}
            </span>
            비로소 진짜 시너지가 난다고 믿습니다. 기술적인 고민을 편하게 나누고
            함께 성장할 수 있는 동료들을 기다리고 있습니다.
          </PTypography>

          <div className='bg-card w-full rounded-xl border p-8 shadow-sm md:p-12'>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-6 md:flex-row'>
                <Field>
                  <FieldLabel htmlFor='contact-name'>Name</FieldLabel>
                  <Input
                    id='contact-name'
                    type='text'
                    placeholder='성함 또는 회사명'
                    className='border-border bg-muted/5 rounded-md'
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor='contact-subject'>Subject</FieldLabel>
                  <Input
                    id='contact-subject'
                    type='text'
                    placeholder='문의 주제'
                    className='border-border bg-muted/5 rounded-md'
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor='contact-message'>Message</FieldLabel>
                <Textarea
                  id='contact-message'
                  placeholder='함께 나누고 싶은 구체적인 이야기를 적어주세요.'
                  className='border-border bg-muted/5 min-h-[200px] w-full resize-none rounded-md p-4 text-base leading-relaxed'
                  value={formData.message}
                  onChange={handleChange}
                />
              </Field>

              <Button
                onClick={handleSendMail}
                className='h-14 w-full rounded-md text-lg font-bold transition-all active:scale-[0.98]'
              >
                <Send className='mr-2 size-5' />
                메일 보내기
              </Button>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
