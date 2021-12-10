/**
 *
 * EmployeePanel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

interface Props {}

export function EmployeePanel(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      Darbuotojų posistemė - darbuotojai gali prisijungti prie darbuotojų
      sąsajos, kurioje gali pridėti, redaguoti, skrydžius, keisti jų statusą,
      suteikti nuolaidas ir
    </Div>
  );
}

const Div = styled.div``;
