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

    const mailtoUrl = `mailto:taeill012@gmail.com?subject=${encodeURIComponent(
      `[문의] ${subject} (보낸이: ${name})`,
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <section id='contact' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='flex flex-col gap-6'>
          <H2Typography className='border-none pb-0 text-left'>
            ✉️ CONTACT
          </H2Typography>

          <PTypography className='text-muted-foreground w-full text-base leading-relaxed break-keep md:text-base lg:text-lg lg:leading-loose'>
            흩어져 있는 정보를 정리하고 기록으로 남기는 과정을 즐깁니다. 혼자
            아는 지식보다 서로의 경험이 맞물려 팀의 실력이 될 때 비로소 일하는
            재미를 느낍니다. 기술적인 고민을 스스럼없이 나누며 함께 몰입할 수
            있는 동료를 찾고 있습니다.
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
