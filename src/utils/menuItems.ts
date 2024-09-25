export interface MenuItem {
    text: string;
    position: {
      desktop: { top: string; left: string };
      mobile: { top: string; left: string };
    };
    subItems?: MenuItem[];
  }

export const items: MenuItem[] = [
    {
      text: 'Empieza por aquí',
      position: {
        desktop: { top: 'calc(50% - 256px)', left: 'calc(50% + 32px)' },
        mobile: { top: 'calc(50% - 257px)', left: 'calc(50% - 62px)' }
      },
      subItems: [
        {
          text: 'Fechas conferencias y recursos',
          position: {
            desktop: { top: 'calc(50% - 350px)', left: 'calc(50% + 148px)' },
            mobile: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' }
          }
        },
        {
          text: 'Conceptos importantes y prácticas básicas',
          position: {
            desktop: { top: 'calc(50% - 218px)', left: 'calc(50% + 194px)' },
            mobile: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' }
          }
        }
      ]
    },
    {
      text: 'Enseñanza de la vía',
      position: {
        desktop: { top: 'calc(50% - 82px)', left: 'calc(50% + 134px)' },
        mobile: { top: 'calc(50% - 209.6218px)', left: 'calc(50% + 64px)' }
      },
      subItems: [
        {
          text: 'Práctica',
          position: {
            desktop: { top: 'calc(50% - 196px)', left: 'calc(50% + 220px)' },
            mobile: { top: 'calc(50% - 194px)', left: 'calc(50% + 30px)' }
          },
          subItems: [
            {
              text: 'Vijñana Bhairava Tantra: Mar',
              position: {
                desktop: { top: 'calc(50% - 312px)', left: 'calc(50% + 268px)' },
                mobile: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' }
              },
            },
            {
              text: 'Vijñana Bhairava Tantra: Odier',
              position: {
                desktop: { top: 'calc(50% - 222px)', left: 'calc(50% + 350px)' },
                mobile: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' }
              },
            },
          ],
        },
        {
          text: 'Cosmovisión',
          position: {
            desktop: { top: 'calc(50% - 67px)', left: 'calc(50% + 295px)' },
            mobile: { top: 'calc(50% - 60px)', left: 'calc(50% + 98px)' }
          },
          subItems: [
            {
              text: 'Shiva Sutras: La Cosmovisión',
              position: {
                desktop: { top: 'calc(50% - 184px)', left: 'calc(50% + 354px)' },
                mobile: { top: 'calc(50% - 223px)', left: 'calc(50% - 50px)' }
              },
              subItems: [
                {
                  text: '1 Despertar',
                  position: {
                    desktop: { top: 'calc(50% - 296px)', left: 'calc(50% + 320px)' },
                    mobile: { top: 'calc(50% - 194px)', left: 'calc(50% + 30px)' }
                  }
                },
                {
                  text: '2 Despertar',
                  position: {
                    desktop: { top: 'calc(50% - 342px)', left: 'calc(50% + 425px)' },
                    mobile: { top: 'calc(50% - 60px)', left: 'calc(50% + 98px)' }
                  }
                },
                {
                  text: '3 Despertar',
                  position: {
                    desktop: { top: 'calc(50% - 236px)', left: 'calc(50% + 468px)' },
                    mobile: { top: 'calc(50% + 70px)', left: 'calc(50% + 30px)' }
                  }
                }
              ]
            },
            {
              text: 'Los 36 Tattvas',
              position: {
                desktop: { top: 'calc(50% - 124px)', left: 'calc(50% + 460px)' },
                mobile: { top: 'calc(50% + 101px)', left: 'calc(50% - 50px)' }
              },
            },
            {
              text: 'Spandakarika',
              position: {
                desktop: { top: 'calc(50% - 6px)', left: 'calc(50% + 460px)' },
                mobile: { top: 'calc(50% - 136px)', left: 'calc(50% + 80px)' }
              }
            },
            {
              text: 'Pratiabhidjaridayam',
              position: {
                desktop: { top: 'calc(50% + 58px)', left: 'calc(50% + 354px)' },
                mobile: { top: 'calc(50% + 15px)', left: 'calc(50% + 80px)' }
              }
            },
          ],
        },
        {
          text: 'Recursos relacionados',
          position: {
            desktop: { top: 'calc(50% + 66px)', left: 'calc(50% + 220px)' },
            mobile: { top: 'calc(50% + 70px)', left: 'calc(50% + 30px)' }
          },
          subItems: [
            {
              text: 'Sat Sang',
              position: {
                desktop: { top: 'calc(50% + 63px)', left: 'calc(50% + 358px)' },
                mobile: { top: 'calc(50% - 194px)', left: 'calc(50% + 30px)' }
              }
            },
            {
              text: 'Textos en PDF',
              position: {
                desktop: { top: 'calc(50% + 185px)', left: 'calc(50% + 328px)' },
                mobile: { top: 'calc(50% - 60px)', left: 'calc(50% + 98px)' }
              }
            },
            {
              text: 'Pruebas',
              position: {
                desktop: { top: 'calc(50% + 196px)', left: 'calc(50% + 203px)' },
                mobile: { top: 'calc(50% + 70px)', left: 'calc(50% + 30px)' }
              }
            }
          ]
        }
      ]
    },
    {
      text: 'Aplicación en tu vida',
      position: {
        desktop: { top: 'calc(50% + 100px)', left: 'calc(50% + 32px)' },
        mobile: { top: 'calc(50% - 115px)', left: 'calc(50% + 153px)' }
      },
      subItems: [
        {
          text: 'Conferencias temáticas',
          position: {
            desktop: { top: 'calc(50% + 88px)', left: 'calc(50% + 192px)' },
            mobile: { top: 'calc(50% + 70px)', left: 'calc(50% + 30px)' }
          },
          subItems: [
            {
              text: 'Temas varios',
              position: {
                desktop: { top: 'calc(50% + 1px)', left: 'calc(50% + 292px)' },
                mobile: { top: 'calc(50% - 223px)', left: 'calc(50% - 50px)' }
              }
            },
            {
              text: 'Feminismo',
              position: {
                desktop: { top: 'calc(50% + 185px)', left: 'calc(50% + 382px)' },
                mobile: { top: 'calc(50% - 136px)', left: 'calc(50% + 80px)' }
              }
            },
            {
              text: 'Cosmovisión tántrica',
              position: {
                desktop: { top: 'calc(50% + 207px)', left: 'calc(50% + 259px)' },
                mobile: { top: 'calc(50% + 15px)', left: 'calc(50% + 80px)' }
              }
            },
            {
              text: 'Conferencias en abierto',
              position: {
                desktop: { top: 'calc(50% + 67px)', left: 'calc(50% + 396px)' },
                mobile: { top: 'calc(50% + 101px)', left: 'calc(50% - 50px)' }
              }
            }
          ]
        },
        {
          text: 'War Room',
          position: {
            desktop: { top: 'calc(50% + 235px)', left: 'calc(50% + 129px)' },
            mobile: { top: 'calc(50% - 60px)', left: 'calc(50% + 98px)' }
          }
        },
        {
          text: 'Preguntas y respuestas',
          position: {
            desktop: { top: 'calc(50% + 235px)', left: 'calc(50% - 36px)' },
            mobile: { top: 'calc(50% - 194px)', left: 'calc(50% + 30px)' }
          }
        }
      ]
    },
    {
      text: 'Prácticas en diferido',
      position: {
        desktop: { top: 'calc(50% - 82px)', left: 'calc(50% - 282px)' },
        mobile: { top: 'calc(50% + 14.6218px)', left: 'calc(50% + 153px)' }
      },
      subItems: [
        {
          text: 'Tandava y práctica con Mar y Juanjo',
          position: {
            desktop: { top: 'calc(50% + 54px)', left: 'calc(50% - 356px)' },
            mobile: { top: 'calc(50% - 194px)', left: 'calc(50% + 30px)' }
        }
        },
        {
          text: 'Yutkis',
          position: {
            desktop: { top: 'calc(50% - 82px)', left: 'calc(50% - 414px)' },
            mobile: { top: 'calc(50% - 60px)', left: 'calc(50% + 98px)' }
        }
        },
        {
          text: 'Visualizaciones',
          position: {
            desktop: { top: 'calc(50% - 204px)', left: 'calc(50% - 328px)' },
            mobile: { top: 'calc(50% + 70px)', left: 'calc(50% + 30px)' }
        },
          subItems: [
            {
              text: 'Iniciáticas Kali',
              position: {
                desktop: { top: 'calc(50% - 321px)', left: 'calc(50% - 370px)' },
                mobile: { top: 'calc(50% - 145.622px)', left: 'calc(50% + 69px)' }
              }
            },
            {
              text: 'Masyendranath',
              position: {
                desktop: { top: 'calc(50% - 220px)', left: 'calc(50% - 450px)' },
                mobile: { top: 'calc(50% + 36.378px)', left: 'calc(50% + 70px)' }
              }
            }
          ]
        }
      ]
    },
    {
      text: 'Chamanismo',
      position: {
        desktop: { top: 'calc(50% + 100px)', left: 'calc(50% - 180px)' },
        mobile: { top: 'calc(50% + 112px)', left: 'calc(50% + 64px)' }
      }
    },
    {
      text: 'Últimos vídeos subidos',
      position: {
        desktop: { top: 'calc(50% - 256px)', left: 'calc(50% - 180px)' },
        mobile: { top: 'calc(50% + 160px)', left: 'calc(50% - 62px)' }
      }
    },
  ];
  