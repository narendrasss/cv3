import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { ITransaction } from 'state/ducks/transactions'

const Transaction: React.FC<ITransaction> = ({
  id,
  type,
  vendor,
  amount,
  date,
  account,
  budget,
  note
}) => {
  const [shouldShowMetadata, setShouldShowMetadata] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const prefix = type === 'income' ? '+' : ''
  return (
    <Wrapper>
      <Flex onClick={() => setShouldShowMetadata(prev => !prev)}>
        <FlexItem>{budget}</FlexItem>
        <FlexItem>{vendor}</FlexItem>
        <FlexItem>{format(date, 'YYYY-MM-DD')}</FlexItem>
        <FlexItem>
          {prefix}
          {amount}
        </FlexItem>
      </Flex>
      {shouldShowMetadata ? (
        <Flex>
          <FlexItem>{account}</FlexItem>
          <FlexItem>{note}</FlexItem>
        </Flex>
      ) : null}

      <button onClick={() => setIsEditing(prev => !prev)}>Edit</button>
    </Wrapper>
  )
}

export default Transaction

const Wrapper = styled.div`
  cursor: pointer;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexItem = styled.p<{ flex?: number }>`
  flex: ${props => props.flex || 1};
`
