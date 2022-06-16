
import { svg_pencil, svg_person } from 'assets/svg';
import Button from 'components/atom/Button';
import PageContent from 'components/layout/PageContent';
import PageContentBody from 'components/layout/PageContentBody';
import PageContentFoot from 'components/layout/PageContentFoot';
import PageContentHead from 'components/layout/PageContentHead';
import PageContentSection from 'components/layout/PageContentSection';
import PageHead from 'components/layout/PageHead';
import { ModalContext } from 'context/ContextList';
import React, { useContext, useState } from 'react';
import { TEditBarState, TModalAction, TPageDesc, TPageInfo } from 'types/types'
import MessageEditor from '../../../components/admin/message/MessageEditor';

export type TEditSmsInfo = {
    id:any,
    isUsed:boolean,
    smsTitle:string,
    smsDesc:string,
    smsContent:string,
    sendBefore:number
}

interface IProps {
    pageData:any,
    pageInfo:TPageInfo<any, undefined>,
    pageDesc:TPageDesc,
    updateGraphSmsState:(id:any, state:boolean) => void
    graphCreateInitialSms:()=>void,
    graphUpdateSmsContent:(smsInfo:any)=> void
}

const MessageLayout:React.FC<IProps> = ({pageData, pageInfo, pageDesc, graphCreateInitialSms, graphUpdateSmsContent}) => {
    
    const [smsInfo, setSmsInfo] = useState<TEditSmsInfo>({
        id:'',
        isUsed:true,
        smsTitle:"이틀전 메시지 내용",
        smsDesc:"이틀 전 보낼 메시지를 작성합니다",
        smsContent:"이틀 전 보내지는 메시지 내용입니다",
        sendBefore:2,
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

    const handleSmsInfo = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setSmsInfo({
            ...smsInfo,
            [e.target.name]:e.target.value
        })
    }

    const handleSmsState = () => {
        setSmsInfo({
            ...smsInfo,
            isUsed:!smsInfo.isUsed
        })
    }

    const setMemberEditInfo = (emeInfo:any) => {
        setSmsInfo({
            id:emeInfo.id,
            isUsed:emeInfo.isUsed,
            smsTitle:emeInfo.title,
            smsDesc:emeInfo.desc,
            smsContent:emeInfo.content,
            sendBefore:parseInt(emeInfo.sendBefore),
        })
    }

    const handleMemberInfoAdd = () => {
        console.log('add');
        console.log(smsInfo);
        // graphAddProduct(memberInfo);
    }

    const handleSMSUpdate = () => {
        console.log('update');
        console.log(smsInfo);
        graphUpdateSmsContent(smsInfo);
    }



    const displaySMSList = () => {

        return pageData.sms.map(function(smsList:any, index:number) {

            return  <section className={`sms__section`} key={`smsList_${index}`}>
                <div className="sms__titlewrap">
                    <div className="sms__titleblock">
                        <div className={`sms__title flex ${smsList.isUsed === false ? 'off': ''}`}>
                            <span>{ smsList.title }</span>
                            <span className="sms__edit" title="수정하기" 
                                  onClick={()=>{
                                     setMemberEditInfo(smsList)
                                     handleModal('open','modal_inputsidebar')
                                  }}
                                  dangerouslySetInnerHTML={{__html:svg_pencil}}>
                            </span>
                        </div>
                        <p className={`sms__subtitle ${smsList.isUsed === false ? 'off': ''}`}>
                            { smsList.smsDesc }
                        </p>
                    </div>
                </div>
                <div className="sms__contentwrap">
                    <div 
                        data-smsid={`${smsList.id}`}
                        className={`sms__contentblock ${smsList.isActive === false ? 'off': ''}`} 
                        dangerouslySetInnerHTML={{__html: smsList.content}}
                    >
                    </div>
                </div>
            </section>
        })

    }


    const pageDataLength = pageData.sms.length;

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
                            <MessageEditor 
                                icon={svg_person}
                                title={editBarState.title}
                                subtitle={editBarState.subtitle}
                                inputData={smsInfo}
                                handleModal={handleModal}
                                handleInput={handleSmsInfo}
                                handleCheckBox={handleSmsState}
                                handleMemberInfoAdd={handleMemberInfoAdd}
                                handleSMSUpdate={handleSMSUpdate}
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
                    <PageContentFoot>
                    </PageContentFoot>
                </>
                }
            </PageContent>
        </>
    )
}

export default MessageLayout
