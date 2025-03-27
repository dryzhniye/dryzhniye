'use client'
import {
  Flex,
  Heading,
} from "@radix-ui/themes";
import {Select} from "@/shared/ui/Select/Select";
import {Button} from "@/shared/ui/Button/Button";
import {useState} from "react";
import Image from "next/image";
import s from './Header.module.scss'
import Link from "next/link";

type Props = {
    isLoggedIn: boolean;
    notifications?: boolean
    countNotifications?: number;
    title: string;
}

export const Header = ({isLoggedIn, notifications, countNotifications, title}: Props) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>('English')

  return (
      <>
          {isLoggedIn
              ?
              <Flex asChild>
                  <header
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          borderBottom: '1px solid var(--gray-5)',
                          backgroundColor: 'var(--dark-900)'
                      }}
                  >
                      <Heading size="4" style={{color: 'var(--light-100)'}}>{title}</Heading>

                      <Flex align="center" gap='4'>
                          <button style={{background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              width: '18px',
                              height: '20px',
                              marginRight: '50px',
                              '--notification-count': countNotifications ? `"${countNotifications}"` : ' '
                          } as React.CSSProperties}

                                  className={` ${notifications ? s.box : ''}`}
                          >
                              {/*todo: добавить точки, если больше */}
                              <Image src={'notification.svg'}
                                     alt={'Уведомление'}
                                     width={'18'}
                                     height={'20'}
                              />
                          </button>

                          <Select options={['English', 'Russian']}
                                  onChange={setSelectedValue}
                                  isLanguage={true}
                                  selectedValue={selectedValue}
                                  width={'163px'}/>
                      </Flex>
                  </header>
              </Flex>
              :
              <Flex asChild>
                  <header
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          borderBottom: '1px solid var(--dark-500)',
                          backgroundColor: 'var(--dark-900)',
                      }}
                  >
                      <Heading size="4" style={{color: 'var(--light-100)'}}>Inctagram</Heading>

                      <Flex align="center" gap="3">
                          <Select options={['English', 'Russian']} onChange={setSelectedValue} isLanguage={true} selectedValue={selectedValue} width={'163px'}/>
                         <Link href={'/sign-up'}>
                             <Button title='Log in' variant={'link'} asChild={'a'}/>
                         </Link>
                          {/*todo: настроить роутинг через кнопку*/}
                          <Link href={'/privacy-policy'}>
                              <Button title='Sign up' variant={'primary'} width={'106px'}/>
                          </Link>
                      </Flex>
                  </header>
              </Flex>
          }
      </>
  );
};