
import { svg_pencil, svg_person } from 'assets/svg';
import PaymentMemoEditor from 'components/admin/paymentmemo/PaymentMemoEditor';
import Button from 'components/atom/Button';
import PageContent from 'components/layout/PageContent';
import PageContentBody from 'components/layout/PageContentBody';
import PageContentFoot from 'components/layout/PageContentFoot';
import PageContentHead from 'components/layout/PageContentHead';
import PageContentSection from 'components/layout/PageContentSection';
import PageHead from 'components/layout/PageHead';
import { ModalContext } from 'context/ContextList';
import { TPaymentMemo, TPaymentMemoDataList } from 'pages/admin/paymentMemo/PaymentMemo';
import React, { useContext, useState } from 'react'
import { TEditBarState, TModalAction, TPageDesc } from 'types/types'

interface IProps {
    pageData:any,
    pageDesc:TPageDesc,
    graphCreateInitialSms:()=>void
    updateGraphPaymentMemo:(memoInfo:any) => void
}

const PaymentMemoLayout:React.FC<IProps> = ({pageData, pageDesc, graphCreateInitialSms, updateGraphPaymentMemo}) => {

    const [memoInfo, setMemoInfo] = useState<TPaymentMemo>({
        id:1,
        isUsed:false,
        memoTitle:"",
        memoDesc:"",
        memo:"이틀 전 보내지는 메시지 내용입니다",
    });

    const [editBarState, SetEditBarState] = useState<TEditBarState>({
        mode:"edit",
        title:"SMS 내용 수정",
        subtitle:"SMS 내용 수정을 추가할 수 있습니다"
    })

    const {modalState, setModalState} = useContext(ModalContext);

    
    const handleModal = (action:TModalAction, modalname:string) => {

        if(action === 'open') {
            setModalState({
                name:modalname,
                active:true,
            })
        }
        if(action === 'close') {
            setModalState({
                name:'',
                active:false,
            })
        }
   
    }

    const handleMempInfo = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemoInfo({
            ...memoInfo,
            [e.target.name]:e.target.value
        })
    }

    const handlMemoState = () => {
        setMemoInfo({
            ...memoInfo,
            isUsed:!memoInfo.isUsed
        })
    }


    const setMemberEditInfo = (memoInfo:any) => {
        setMemoInfo({
            id:memoInfo.id,
            isUsed:memoInfo.isUsed,
            memoTitle:memoInfo.memoTitle,
            memoDesc:memoInfo.memoDesc,
            memo:memoInfo.memo,
        })
    }

    const handleMemberInfoUpdate = () => {
        console.log('update');
        console.log(memoInfo);
        updateGraphPaymentMemo(memoInfo);
    }

    
    const displaySMSList = () => {

        return pageData.paymentmemo.map(function(memoInfo:any, index:number) {

            return  <section className={`sms__section`} key={`memoInfo_${index}`}>
                <div className="sms__titlewrap">
                    <div className="sms__titleblock">
                        <div className={`sms__title flex ${memoInfo.isUsed === false ? 'off': ''}`}>
                            <span>{ memoInfo.memoTitle }</span>
                            <span className="sms__edit" title="수정하기" 
                                  onClick={()=>{
                                     setMemberEditInfo(memoInfo)
                                     handleModal('open','modal_inputsidebar')
                                  }}
                                  dangerouslySetInnerHTML={{__html:svg_pencil}}>
                            </span>
                        </div>
                        <p className={`sms__subtitle ${memoInfo.isUsed === false ? 'off': ''}`}>
                            { memoInfo.memoDesc }
                        </p>
                    </div>
                </div>
                <div className="sms__contentwrap">
                    <div 
                        data-smsid={`${memoInfo.id}`}
                        className={`sms__contentblock ${memoInfo.isUsed === false ? 'off': ''}`} 
                        dangerouslySetInnerHTML={{__html: memoInfo.memo}}
                    >
                    </div>
                </div>
            </section>
        })

    }
    
    const pageDataLength = pageData.paymentmemo.length;

    return (
        <>
            <PageHead 
                title={pageDesc.title}
                subtitle={pageDesc.subtitle}
            />
            <PageContent>
                <PageContentHead>
                </PageContentHead>
                {
                    pageDataLength > 0 &&
                    <>
                    <PageContentBody>
                        {
                            modalState.name === 'modal_inputsidebar' &&
                            <PaymentMemoEditor 
                                icon={svg_person}
                                title={"결제 메모 수정"}
                                subtitle={"결제 메모를 수정할 수 있습니다"}
                                inputData={memoInfo}
                                handleModal={handleModal}
                                handleInput={handleMempInfo}
                                handleCheckBox={handlMemoState}
                                handleMemberInfoUpdate={handleMemberInfoUpdate}
                            />
                        }
                        <PageContentSection>
                            {
                                pageDataLength === 0 && 
                                    <Button className="sms__initbtn"
                                            onClick={graphCreateInitialSms}
                                    >
                                        문자 초기 세팅
                                    </Button>
                            }
                            {
                                pageDataLength > 0 &&
                                    displaySMSList()
                            }
                        </PageContentSection>
                        
                    </PageContentBody>
                    <PageContentFoot
                        className='flexend'
                    >
                    </PageContentFoot>
                    </>
                }
            </PageContent>
        </>
    )
}

export default PaymentMemoLayout
