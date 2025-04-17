'use client'
import React, { useEffect, useState } from 'react'
import Input from '@/shared/ui/base/Input/Input'
import { DatePicker } from '../base/DatePicker'
import { Select } from '@/shared/ui/base/Select/Select'
import TextArea from '@/shared/ui/base/TextArea/TextArea'
import s from './GeneralInfoForm.module.scss'
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { SettingsForm } from '@/shared/lib/schemas/settingsSchema'
import { Controller } from 'react-hook-form'
import { Country, City } from 'country-state-city';

type FormProps = {
  register: UseFormRegister<SettingsForm>
  setValue: UseFormSetValue<SettingsForm>
  errors: FieldErrors<SettingsForm>
  control: Control<SettingsForm>
}

export const GeneralInfoForm = ({ register, setValue, errors, control }: FormProps) => {

  const countries = Country.getAllCountries();

  const countryNameToIsoMap = Object.fromEntries(
    countries.map(country => [country.name, country.isoCode])
  );
  const countryOptions = countries.map(country => (country.name));
  const [selectedCountryIso, setSelectedCountryIso] = useState<string | null>(null);
  const [cityOptions, setCityOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCountryIso) {
      const citiesForCountry = City.getCitiesOfCountry(selectedCountryIso);
      const formattedCities = citiesForCountry?.map(city => city.name) || [];
      setCityOptions(formattedCities);
    } else {
      setCityOptions([]);
    }
  }, [selectedCountryIso]);

  const handleCountryChange = (countryName: string, onChange: (value: string) => void) => {
    setCityOptions([])
    setValue('city', '')
    const countryIso = countryNameToIsoMap[countryName];
    setSelectedCountryIso(countryIso);
    onChange(countryName);
  };
  return (

    <div className={s.profileForm}>
      <div className={s.block}>
        <Input
          label={'Username'}
          placeholder={'Your nickname'}
          width={'100%'}
          required
          error={errors.userName?.message}
          {...register('userName')}
        />
        <Input
          label={'First Name'}
          placeholder={'Your name'}
          width={'100%'}
          required
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label={'Last Name'}
          placeholder={'Your surname'}
          width={'100%'}
          required
          error={errors.lastName?.message}
          {...register('lastName')}
        />

        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field, fieldState }) => (
            <DatePicker
              mode={'single'}
              width={'100%'}
              // required={true}
              // selectOnly={true}
              label={'Date of birth'}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
        <div className={s.formRow}>

          <Controller
            control={control}
            name="country"
            render={({ field, fieldState }) => (
              <Select error={fieldState.error?.message}
                      placeholder={'Country'}
                      label={"Select your country"}
                      width={'100%'}
                      options={countryOptions}
                      {...field}
                      onChange={(value) => handleCountryChange(value, field.onChange)}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field, fieldState }) => (
          <Select error={fieldState.error?.message}
                  placeholder={'City'}
                  label={"Select your city"}
                  width={'100%'}
                  disabled={!selectedCountryIso}
                  options={cityOptions}
                  {...field}
          />
            )}
          />
        </div>
        <Controller
          control={control}
          name="aboutMe"
          render={({ field, fieldState }) => (
            <>
              <TextArea error={fieldState.error?.message}
                        placeholder={'Type something about you...'}
                        label={'About me'}
                        width={'100%'}
                        height={'84px'}
                        {...field}
              />
            </>
          )}
        />
      </div>

    </div>
  )
}