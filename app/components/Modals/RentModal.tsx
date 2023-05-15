'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CitySelect from "../inputs/CitySelect";
import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';

enum STEPS {
  LOCATION = 0,
  INFO = 1,
  CATEGORY = 2,
  DESCRIPTION = 3,
  IMAGES = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.LOCATION);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick =
    (category: string) => {
    if (selectedCategories.includes(category))
    {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    } else
    {
      setSelectedCategories(prev => [...prev, category]);
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: [],
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    if (id === 'category')
    {
      setValue(id, [...category, value], { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    } else
    {
      setValue(id, value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    }
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE)
    {
      return onNext();
    }

    setIsLoading(true);

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.LOCATION)
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE)
    {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY)
    {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent;

  switch (step)
  {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={handleCategoryClick}
                  selected={selectedCategories.includes(item.label)}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <CitySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
        </div>
      );
      break;
    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What ammenities do you have?"
          />
          <Counter
            onChange={(value: any) => setCustomValue('guestCount', value)}
            value={guestCount}
            title="Guests"
            subtitle="How many guests do you allow?"
          />
          <hr />
          <Counter
            onChange={(value: any) => setCustomValue('roomCount', value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you have?"
          />
          <hr />
          <Counter
            onChange={(value: any) => setCustomValue('bathroomCount', value)}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
          />
        </div>
      )
      break;
    case STEPS.IMAGES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />
          <ImageUpload
            onChange={(value: any) => setCustomValue('imageSrc', value)}
            value={imageSrc}
          />
        </div>
      )
      break;
    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place?"
            subtitle="Short and sweet works best!"
          />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
      break;
    case STEPS.PRICE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night?"
          />
          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}

export default RentModal;
