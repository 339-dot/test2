async function connectWallet(walletType) {
    showStatus('正在连接钱包...', 'info');

    try {
        if (walletType === 'okx') {

            let provider = null;

            // ✅ 兼容多种 OKX 注入方式
            if (window.okxwallet) {
                provider = window.okxwallet;
            } else if (window.okxWallet) {
                provider = window.okxWallet;
            } else if (window.ethereum && window.ethereum.isOkx) {
                provider = window.ethereum;
            } else if (window.ethereum?.providers) {
                // MetaMask / OKX 共存情况
                provider = window.ethereum.providers.find(p => p.isOkx);
            }

            if (!provider) {
                showStatus(
                    '未检测到欧易钱包<br/>请确认：<br/>1️⃣ 已安装 OKX 插件<br/>2️⃣ 已解锁钱包',
                    'error'
                );
                return;
            }

            const accounts = await provider.request({
                method: 'eth_requestAccounts'
            });

            userAddress = accounts[0];
            window.provider = provider;
            currentWallet = 'okx';

            showStatus('✅ 欧易钱包连接成功', 'success');
            updateAccountInfo();
            checkForm();

        } else if (walletType === 'tp') {
            // TP 钱包逻辑保持不变
        }
    } catch (err) {
        console.error(err);
        showStatus('连接失败：' + err.message, 'error');
    }
}
