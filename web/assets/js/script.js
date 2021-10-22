
document.getElementById("closeBtn").addEventListener('click',()=>{
    window.close();
})
import CustomModal from './components/CustomModal.js'
const vm = new Vue({
    el: '#app',
    components:{
        CustomModal
    },
    data: {
        titulo: "Olá mundos",
        contador: 0,
        dados: {},
        link: '',
        url: '',
        title: '',
        modal: '',
        modalBody: '',
        modalAtivo: true,
        downloadFilePath: '',
        programStats:'Aguardando link ...',
        searching: false,
        modalAviso:false,
        download: {
            fileSize: 0,
            downloadedSize: 0,
            remainingSize: 0,
            downloaded: false,
            downloading: false,
            outPath: '',
            fileName: '',
        }
    },
    methods: {
        enviarLink() {
            this.searching = true;
            this.download.downloading = false
            this.download.downloaded = false
            this.programStats = 'Buscando formatos para download ...'
            eel.youtube(this.link)((dados) => {
                if(dados){
                    this.searching = false;
                    this.programStats = 'Formatos localizados!'
                    this.dados = dados['formatos']
                    this.url = dados['thumbnail']
                    this.title = dados['title']
                }
            })
        },
        baixarVideo(itag) {
            this.programStats = 'Baixando ...'
            this.download.downloading = true
            this.download.downloaded = false
            eel.downloadItag(this.link, itag)(data =>{
                this.download.outPath = data[0]
                this.download.fileName = data[1]
            })
        },
        openModal() {
            this.$refs.modal.openModal()
        },
        abrirLocal(){
            eel.openLocation(this.download.outPath)
        },
        abrirArquivo(){
            console.log(this.download.fileName)
            eel.openLocation(this.download.outPath,this.download.fileName)
        }
    },
    computed: {
        downloadPercent() {
            let max = this.download.fileSize
            let now = this.download.remainingSize
            if (now == max) return 0
            let real = max - now
            return (100 * real / max).toFixed(0)
        }
    },
    watch:{
        download(){
            console.log("a")
        }
    }

})
function getFileLeft(remainingSize,downloadedSize) {
    vm.download.remainingSize = remainingSize
    vm.download.downloadedSize = downloadedSize
}
eel.expose(getFileLeft)

function getFileSize(size) {
    vm.download.fileSize = size
}
eel.expose(getFileSize)
function downloadCompleted() {
    vm.programStats = 'Download Completo!'
    vm.modalAviso = false
    vm.download.downloaded = true
    vm.download.downloading = false
    if(vm.download.downloadedSize == vm.download.remainingSize){
        vm.modalBody = "O arquivo já está baixado!"
    }else{
        vm.modalBody = "Download Concluído! Verifique a pasta Downloads!"
    }
    vm.openModal()
}
eel.expose(downloadCompleted)

function invalidLink(){
    vm.searching = false;
    vm.modalAviso = true;
    vm.programStats = "Link inválido!"
    // vm.modalBody = `Link inválido!</h1>`
    vm.openModal()
}
eel.expose(invalidLink)
