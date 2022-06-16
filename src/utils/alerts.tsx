
export const graphMutationFailed = (err:any, queryName:string) => {
    console.log(err);
    alert(`Graphql Mutation 실패 : ${queryName}`);
}

export const updateSuccess = () => {
    alert('성공적으로 업데이트 되었습니다');
}

export const updateFailed = (err:any) => {
    if(!err) {
        alert('업데이트에 실패하였습니다');
    }
    alert(`업데이트에 실패하였습니다 : ${err}`)
}




