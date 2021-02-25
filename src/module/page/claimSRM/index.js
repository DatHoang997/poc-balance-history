import React, { useEffect, useState } from 'react'
import StandardPage from '../StandardPage'
import { Input, Row, Col, Button } from 'antd'
import Service from '../../../service/service'
import 'antd/dist/antd.css'
import './style.scss'

const stats = () => {
  const [addressA, setAddressA] = useState('')
  const service = new Service

  const find = async () => {
    console.log('addressA',addressA)
    let response = await service.find(addressA)
  }

  return (
    <StandardPage>
       <Row>
        <Col span={4}></Col>
        <Col span={20}>
          <p>Address:</p>
        </Col>
      </Row>
      <Row>
        <Col span={4}></Col>
        <Col span={10}>
          <Input onChange={(e) => {setAddressA(e.target.value);}} />
        </Col>
        <Col span={1}></Col>
        <Col span={4}>
          <Button type='primary' onClick={find}>Submit</Button>
        </Col>
      </Row>
    </StandardPage>
  )
}

export default stats
