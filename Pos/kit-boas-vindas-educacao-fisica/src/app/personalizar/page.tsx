'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Book, ShirtSizeCode, StudentData, AddressData, KitSubmissionPayload } from '@/types';
import { SHIRT_SIZES } from '@/data/shirtSizes';
import { generateProtocol } from '@/utils/validators';
import { submitKitCustomization } from '@/services/submission';

import Header from '@/components/header/Header';
import ProgressBar from '@/components/common/ProgressBar';
import Step1Books from '@/components/steps/Step1Books';
import Step2Shirt from '@/components/steps/Step2Shirt';
import Step3Student from '@/components/steps/Step3Student';
import Step4Address from '@/components/steps/Step4Address';
import Step5Review from '@/components/steps/Step5Review';
import Step6Success from '@/components/steps/Step6Success';

export default function PersonalizarPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);

  // Estados dos dados da jornada
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedShirt, setSelectedShirt] = useState<ShirtSizeCode | null>(null);

  const [studentData, setStudentData] = useState<StudentData>({
    name: '',
    cpf: '',
    phone: '',
    email: '',
    course: '',
    confirmedMatricula: false,
  });

  const [addressData, setAddressData] = useState<AddressData>({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    confirmedAddress: false,
  });

  const [generatedProtocol, setGeneratedProtocol] = useState<string>('');

  // Scroll para o topo a cada transição de etapa
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleUpdateStudentData = (data: Partial<StudentData>) => {
    setStudentData((prev) => ({ ...prev, ...data }));
  };

  const handleUpdateAddressData = (data: Partial<AddressData>) => {
    setAddressData((prev) => ({ ...prev, ...data }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxReachedStep) {
      setMaxReachedStep(step);
    }
  };

  const handleFinalSubmit = async () => {
    if (!selectedBook || !selectedShirt) return;

    const protocol = generateProtocol();
    setGeneratedProtocol(protocol);

    const shirtObj = SHIRT_SIZES.find((s) => s.code === selectedShirt);
    const measureStr = shirtObj ? `${shirtObj.width}x${shirtObj.length}cm` : '';

    const payload: KitSubmissionPayload = {
      protocol,
      timestamp: new Date().toISOString(),
      student: studentData,
      book: selectedBook,
      shirt: {
        size: selectedShirt,
        measure: measureStr,
      },
      address: addressData,
    };

    await submitKitCustomization(payload);
    goToStep(6);
  };

  const handleReset = () => {
    setSelectedBook(null);
    setSelectedShirt(null);
    setStudentData({
      name: '',
      cpf: '',
      phone: '',
      email: '',
      course: '',
      confirmedMatricula: false,
    });
    setAddressData({
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      confirmedAddress: false,
    });
    setGeneratedProtocol('');
    setCurrentStep(1);
    setMaxReachedStep(1);
    router.push('/');
  };

  return (
    <>
      <Header />
      <ProgressBar
        currentStep={currentStep}
        onStepClick={(step) => goToStep(step)}
        maxReachedStep={maxReachedStep}
      />

      <main>
        {currentStep === 1 && (
          <Step1Books
            selectedBook={selectedBook}
            onSelectBook={(book) => setSelectedBook(book)}
            onNext={() => goToStep(2)}
            onBack={() => router.push('/')}
          />
        )}

        {currentStep === 2 && (
          <Step2Shirt
            selectedSize={selectedShirt}
            onSelectSize={(size) => setSelectedShirt(size)}
            onNext={() => goToStep(3)}
            onBack={() => goToStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3Student
            studentData={studentData}
            onUpdateStudentData={handleUpdateStudentData}
            onNext={() => goToStep(4)}
            onBack={() => goToStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4Address
            addressData={addressData}
            onUpdateAddressData={handleUpdateAddressData}
            onNext={() => goToStep(5)}
            onBack={() => goToStep(3)}
          />
        )}

        {currentStep === 5 && selectedBook && selectedShirt && (
          <Step5Review
            book={selectedBook}
            shirtSize={selectedShirt}
            student={studentData}
            address={addressData}
            onSubmit={handleFinalSubmit}
            onGoToStep={(step) => goToStep(step)}
            onBack={() => goToStep(4)}
          />
        )}

        {currentStep === 6 && selectedBook && selectedShirt && (
          <Step6Success
            protocol={generatedProtocol}
            book={selectedBook}
            shirtSize={selectedShirt}
            student={studentData}
            address={addressData}
            onReset={handleReset}
          />
        )}
      </main>
    </>
  );
}
